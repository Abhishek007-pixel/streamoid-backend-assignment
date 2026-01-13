# Streamoid Product Catalog API

A robust **RESTful Backend Service** designed to ingest, validate, and manage product data via CSV uploads. Built with **Node.js**, **Express**, and **SQLite**.

This project provides a complete solution for processing bulk product updates, ensuring data integrity through strict validation rules, and offering flexible search and filtering capabilities.

## 🚀 Key Features
* **CSV Parsing & Validation**: Automatically validates constraints (e.g., `Price <= MRP`, `Quantity >= 0`) before storage.
* **Dynamic Search**: Filter products by Brand, Color, and Price Range simultaneously.
* **Pagination**: Efficiently handles large datasets with customizable page sizes.
* **Zero-Config Database**: Uses **SQLite** for a serverless, portable database solution.
* **Dockerized**: Includes full Docker support for containerized deployment.
* **Unit Testing**: Includes Jest test suites for core business logic validation.

---

## ⚙️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite3
* **Tools:** Multer (File Handling), CSV-Parser
* **Testing:** Jest
* **DevOps:** Docker

---

## 🛠️ Setup & Installation

### Option 1: Standard Node.js Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Abhishek007-pixel/streamoid-backend-assignment.git
    cd streamoid-api
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Server**
    ```bash
    npm run dev
    ```
    * The server will start at `http://localhost:8000`.
    * The database file (`database.sqlite`) will be created automatically.

### Option 2: Docker Setup (Bonus)

1.  **Build the Image**
    ```bash
    docker build -t streamoid-api .
    ```

2.  **Run the Container**
    ```bash
    docker run -p 8000:8000 streamoid-api
    ```

---

## 🧾 API Documentation

### 🔹 Base URL
`http://localhost:8000`

### 1. Upload Products (CSV)
Uploads a bulk CSV file, validates entries, and stores valid products.

* **Endpoint:** `POST /upload`
* **Body:** `form-data`
    * `file`: (Select your `products.csv` file)
* **Validation Rules:**
    * `price` cannot exceed `mrp`.
    * `quantity` cannot be negative.
    * Duplicate SKUs are ignored (`INSERT OR IGNORE`).

**Example Request (cURL):**
```bash
curl -X POST -F "file=@products.csv;type=text/csv" http://localhost:8000/upload
Example Response (Based on provided CSV):

JSON

**Example Response:**
```json
{
    "stored": 19,
    "failed": [
        {
            "sku": "SHIRT-PLN-L",
            "error": "Validation failed"
        }
    ]
}
2. List All Products
Retrieves a paginated list of all stored products.

Endpoint: GET /products

Query Parameters:

page: Page number (default: 1)

limit: Items per page (default: 10)

Example Request:

Bash

curl "http://localhost:8000/products?page=1&limit=2"
Example Response:

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
Filters products based on multiple attributes dynamically.

Endpoint: GET /products/search

Query Parameters: (All are optional)

brand: Filter by brand name (partial match).

color: Filter by color.

minPrice: Minimum price.

maxPrice: Maximum price.

Example Request (Find DenimWorks jeans under 1500):

Bash

curl "http://localhost:8000/products/search?brand=DenimWorks&maxPrice=1500"
Example Response:

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