const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const fileUpload = require("../middleware/fileUpload");

// 1. Upload Route (POST /upload)
router.post("/upload", fileUpload.single('file'), productController.handleUploadProducts);

// 2. Search Route (GET /products/search)
// Note: This MUST come before the list route!
router.get("/products/search", productController.handleSearchProducts);

// 3. List Route (GET /products)
router.get("/products", productController.handleGetProducts);

module.exports = router;