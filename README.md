📦 Streamoid Product Catalog API

A robust RESTful Backend Service that allows sellers to upload, validate, store, list, and search product catalogs using CSV files.

Built as part of the Streamoid Backend Intern/Fresher Take-Home Assignment, this service simulates how product data is validated before being sent to marketplaces like Amazon, Flipkart, Myntra.

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

🧪 Unit Tests

Validation & search logic tested using Jest

⚙️ Tech Stack
Category	Technology
Runtime	Node.js
Framework	Express.js
Database	SQLite3
File Upload	Multer
CSV Parsing	csv-parser
Testing	Jest
DevOps	Docker
🛠️ Setup & Installation
Option 1: Run Locally (Node.js)
1️⃣ Clone Repository
git clone https://github.com/Abhishek007-pixel/streamoid-backend-assignment.git
cd streamoid-backend-assignment

2️⃣ Install Dependencies
npm install

3️⃣ Start Server
npm run dev


📍 Server will start at:

http://localhost:8000


📁 SQLite database file is auto-created.

Option 2: Run Using Docker (Bonus)
Build Docker Image
docker build -t streamoid-api .

Run Container
docker run -p 8000:8000 streamoid-api

🧾 API Documentation
🔹 Base URL
http://localhost:8000

1️⃣ Upload Products (CSV)

Uploads a CSV file, validates each row, and stores valid products.

Endpoint
POST /upload

Validation Rules

price ≤ mrp

quantity ≥ 0

Required fields: sku, name, brand, mrp, price

Duplicate SKUs are ignored

🧪 Testing the API
You can test endpoints using:

Postman
cURL

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

Returns stored products with pagination support.

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

Filter products dynamically using multiple query parameters.

Endpoint
GET /products/search

Query Parameters (Optional)
Parameter	Description
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
✓ should return true for valid product
✓ should fail when price > mrp
✓ should build search query correctly

📮 Manual Testing

You can test all endpoints using:

Postman

curl commands (provided above)

✅ Assignment Compliance

✔ CSV parsing & validation
✔ REST APIs for upload, list & search
✔ Pagination support
✔ SQLite persistence
✔ Docker support (bonus)
✔ Unit tests (bonus)