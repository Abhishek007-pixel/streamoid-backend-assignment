const fs = require("fs");
const csv = require("csv-parser");
const { query } = require("../config/db");
const HttpError = require("../models/http-error");

// --- 1. Validation Logic (Helper) ---
function isValidProduct(p) {
  if (!p.sku || !p.name || !p.brand || !p.color || !p.size) return false;
  if (!p.mrp || !p.price || !p.quantity) return false;

  const price = Number(p.price);
  const mrp = Number(p.mrp);
  const qty = Number(p.quantity);

  if (isNaN(price) || isNaN(mrp) || isNaN(qty)) return false;
  if (price > mrp) return false;
  if (qty < 0) return false;

  return true;
}

// --- 2. Search Logic (Helper) ---
function buildSearchQuery(queryParams) {
  const { brand, color, minPrice, maxPrice } = queryParams;
  let sql = `SELECT * FROM products WHERE 1=1`;
  const params = [];

  if (brand) {
    params.push(`%${brand}%`);
    sql += ` AND brand LIKE ?`;
  }
  if (color) {
    params.push(`%${color}%`);
    sql += ` AND color LIKE ?`;
  }
  if (minPrice) {
    params.push(minPrice);
    sql += ` AND price >= ?`;
  }
  if (maxPrice) {
    params.push(maxPrice);
    sql += ` AND price <= ?`;
  }
  
  return { sql, params };
}

// --- 3. Controller Functions ---

async function handleUploadProducts(req, res, next) {
  if (!req.file) return next(new HttpError("CSV file is required", 400));

  const filePath = req.file.path;
  const validProducts = [];
  const errors = [];
  const rows = [];

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => rows.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    for (const row of rows) {
      const cleaned = {};
      Object.keys(row).forEach((key) => {
        cleaned[key.trim().replace(/^\uFEFF/, "")] = row[key]?.trim();
      });

      if (isValidProduct(cleaned)) {
        validProducts.push(cleaned);
      } else {
        errors.push({ 
          sku: cleaned.sku || "UNKNOWN", 
          error: "Validation failed" 
        });
      }
    }

    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sku TEXT UNIQUE,
        name TEXT,
        brand TEXT,
        color TEXT,
        size TEXT,
        mrp REAL,
        price REAL,
        quantity INTEGER
      )
    `);

    for (const p of validProducts) {
      await query(
        `INSERT OR IGNORE INTO products (sku, name, brand, color, size, mrp, price, quantity)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.sku, p.name, p.brand, p.color, p.size, p.mrp, p.price, p.quantity]
      );
    }

    // fs.unlink(filePath, () => {}); // Comment out for local testing
    
    res.status(200).json({
      stored: validProducts.length,
      failed: errors
    });

  } catch (err) {
    console.error(err);
    return next(new HttpError("Parsing failed", 500));
  }
}

async function handleGetProducts(req, res, next) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const result = await query(
      `SELECT * FROM products LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    return next(new HttpError("Fetching products failed", 500));
  }
}

async function handleSearchProducts(req, res, next) {
  try {
    // Use the helper function so we can test it!
    const { sql, params } = buildSearchQuery(req.query);
    
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    return next(new HttpError("Search failed", 500));
  }
}

// --- Exports (Including helpers for testing) ---
module.exports = {
  handleUploadProducts,
  handleGetProducts,
  handleSearchProducts,
  isValidProduct,
  buildSearchQuery
};