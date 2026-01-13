# Streamoid Product Catalog API

A robust **RESTful Backend Service** designed to ingest, validate, and manage product data via CSV uploads. Built with **Node.js**, **Express**, and **SQLite**.

This project provides a complete solution for processing bulk product updates, ensuring data integrity through strict validation rules, and offering flexible search and filtering capabilities.

---

## ⚙️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite3 (Serverless)
* **Tools:** Multer (File Handling), CSV-Parser
* **Testing:** Jest
* **DevOps:** Docker

---

## 🚀 Key Features

* ✅ **CSV Parsing & Validation:** Automatically validates constraints (e.g., `Price <= MRP`, `Quantity >= 0`) before storage.
* ✅ **Dynamic Search:** Filter products by Brand, Color, and Price Range simultaneously.
* ✅ **Pagination:** Efficiently handles large datasets with customizable page sizes.
* ✅ **Zero-Config Database:** Uses SQLite for immediate setup without installation.
* ✅ **Dockerized:** Includes full Docker support for containerized deployment.

---

## 🛠️ Setup & Initialization

### 1. Clone the Repository
```bash
git clone [https://github.com/Abhishek007-pixel/streamoid-backend-assignment.git](https://github.com/Abhishek007-pixel/streamoid-backend-assignment.git)
cd streamoid-api
2. Install Dependencies
```

Bash

npm install
3. Start the Server
Bash

npm run dev
Output:

Server started at http://localhost:8000

Database database.sqlite created automatically.

🐳 Docker Setup (Bonus)
If you prefer using Docker, you can run the entire application in a container.

1. Build the Image

Bash

docker build -t streamoid-api .
2. Run the Container

Bash

docker run -p 8000:8000 streamoid-api
🧾 API Documentation
🔹 Base URL
http://localhost:8000

1. Upload Products (CSV)
Description: Uploads a bulk CSV file, validates entries, and stores valid products.

Endpoint: POST /upload

Body Type: multipart/form-data

file: (Select your products.csv file)

📝 Example Request:

Bash

curl -X POST -F "file=@products.csv;type=text/csv" http://localhost:8000/upload
📦 Example Response:

JSON

{
    "stored": 20,
    "failed": []
}
2. List All Products
Description: Retrieves a paginated list of all stored products.

Endpoint: GET /products

Query Parameters:

page: Page number (default: 1)

limit: Items per page (default: 10)

📝 Example Request:

Bash

curl "http://localhost:8000/products?page=1&limit=2"
📦 Example Response:

JSON

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
3. Search & Filter
Description: Filters products based on multiple attributes dynamically.

Endpoint: GET /products/search

Query Parameters (All Optional):

brand: Filter by brand name (partial match).

color: Filter by color.

minPrice: Minimum price.

maxPrice: Maximum price.

📝 Example Request (Find DenimWorks jeans under 1500):

Bash

curl "http://localhost:8000/products/search?brand=DenimWorks&maxPrice=1500"
📦 Example Response:

JSON

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
Unit Tests
This project uses Jest to verify business logic (validation rules and search query construction).

Run the test suite:

Bash

npm test
Expected Output:

Plaintext

PASS  tests/validation.test.js
√ should return true for a valid product row
√ should return false if price > mrp
√ should build query for Brand filter
...
Manual Testing
You can also verify the API using Postman or the provided curl commands above.