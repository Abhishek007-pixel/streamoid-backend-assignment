📦 Streamoid Product Catalog API

A robust RESTful Backend Service that enables sellers to upload, validate, store, list, and search products using CSV files.

Built as part of the Streamoid Backend Intern/Fresher Take-Home Assignment, this service simulates how seller catalogs are validated before being sent to marketplaces like Amazon, Flipkart, and Myntra.

🚀 Key Features

📄 CSV Upload & Validation

Validates required fields

Ensures price ≤ mrp and quantity ≥ 0

🔍 Dynamic Search & Filtering

Filter by brand, color, and price range

📃 Paginated Product Listing

🗃️ SQLite Database

Zero-config, file-based persistence

🐳 Dockerized Setup

🧪 Unit Tests for validation & search logic

⚙️ Tech Stack
Layer	Technology
Runtime	Node.js
Framework	Express.js
Database	SQLite3
CSV Handling	Multer, csv-parser
Testing	Jest
DevOps	Docker
🛠️ Project Setup
1️⃣ Clone the Repository
git clone https://github.com/Abhishek007-pixel/streamoid-backend-assignment.git
cd streamoid-backend-assignment

2️⃣ Install Dependencies
npm install

3️⃣ Start the Server
npm run dev


📍 Server runs at:

http://localhost:8000


📁 SQLite database is created automatically.

🐳 Docker Setup (Bonus)
Build Image
docker build -t streamoid-api .

Run Container
docker run -p 8000:8000 streamoid-api

🧾 API Documentation
🔹 Base URL
http://localhost:8000

1️⃣ Upload Products (CSV)

Upload and validate products in bulk using a CSV file.

Endpoint
POST /upload

Validation Rules

price ≤ mrp

quantity ≥ 0

Required fields: sku, name, brand, mrp, price

Duplicate SKUs are ignored

📌 Example Request
curl -X POST -F "file=@products.csv" http://localhost:8000/upload

📌 Example Response
{
  "stored": 19,
  "failed": [
    {
      "sku": "SHIRT-PLN-L",
      "error": "Validation failed"
    }
  ]
}

2️⃣ List All Products (Paginated)

Retrieve all stored products with pagination support.

Endpoint
GET /products

Query Parameters
Parameter	Description	Default
page	Page number	1
limit	Items per page	10
📌 Example Request
curl "http://localhost:8000/products?page=1&limit=2"

📌 Example Response
[
  {
    "id": 1,
    "sku": "TSHIRT-RED-001",
    "name": "Classic Cotton T-Shirt",
    "brand": "StreamThreads",
    "color": "Red",
    "size": "M",
    "mrp": 799,
    "price": 499,
    "quantity": 20
  },
  {
    "id": 2,
    "sku": "TSHIRT-BLK-002",
    "name": "Classic Cotton T-Shirt",
    "brand": "StreamThreads",
    "color": "Black",
    "size": "L",
    "mrp": 799,
    "price": 549,
    "quantity": 12
  }
]

3️⃣ Search & Filter Products

Search products using one or more filters dynamically.

Endpoint
GET /products/search

Available Filters (Optional)
Filter	Description
brand	Brand name (partial match)
color	Product color
minPrice	Minimum price
maxPrice	Maximum price
📌 Example Request

Find DenimWorks jeans under 1500

curl "http://localhost:8000/products/search?brand=DenimWorks&maxPrice=1500"

📌 Example Response
[
  {
    "id": 5,
    "sku": "JEANS-BLK-030",
    "name": "Slim Fit Jeans",
    "brand": "DenimWorks",
    "color": "Black",
    "size": "30",
    "mrp": 1999,
    "price": 1499,
    "quantity": 18
  }
]

🧪 Testing
Run Unit Tests
npm test

Expected Output
PASS  tests/validation.test.js
✓ valid product passes validation
✓ fails when price > mrp
✓ builds dynamic search query

🔍 Manual Testing

You can test all endpoints using:

Postman

curl commands (shown above)

✅ Assignment Coverage

✔ CSV parsing & validation
✔ REST APIs (upload, list, search)
✔ Pagination
✔ SQLite persistence
✔ Docker support (bonus)
✔ Unit tests (bonus)