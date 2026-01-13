Markdown# Streamoid Product Catalog API

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

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Abhishek007-pixel/streamoid-backend-assignment.git
   cd streamoid-api
Install DependenciesBashnpm install
Start the ServerBashnpm run dev
The server will start at http://localhost:8000.The database file (database.sqlite) will be created automatically.Option 2: Docker Setup (Bonus)Build the ImageBashdocker build -t streamoid-api .
Run the ContainerBashdocker run -p 8000:8000 streamoid-api
🧾 API Documentation🔹 Base URLhttp://localhost:80001. Upload Products (CSV)Uploads a bulk CSV file, validates entries, and stores valid products.Endpoint: POST /uploadBody: multipart/form-datafile: (Select your products.csv file)Validation Rules:price cannot exceed mrp.quantity cannot be negative.Duplicate SKUs are ignored (INSERT OR IGNORE).Example Request (cURL):Bashcurl -X POST -F "file=@products.csv;type=text/csv" http://localhost:8000/upload
Example Response:JSON{
    "stored": 19,
    "failed": [
        {
            "sku": "SHIRT-PLN-L",
            "error": "Validation failed"
        }
    ]
}
2. List All ProductsRetrieves a paginated list of all stored products.Endpoint: GET /productsQuery Parameters:ParameterTypeDefaultDescriptionpageInteger1The page number to retrieve.limitInteger10The number of items per page.Example Request:Bashcurl "http://localhost:8000/products?page=1&limit=2"
Example Response:JSON[
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
3. Search & FilterFilters products based on multiple attributes dynamically.Endpoint: GET /products/searchQuery Parameters (All Optional):ParameterDescriptionbrandFilter by brand name (partial match supported).colorFilter by product color.minPriceFilter products greater than or equal to this price.maxPriceFilter products less than or equal to this price.Example Request (Find DenimWorks jeans under 1500):Bashcurl "http://localhost:8000/products/search?brand=DenimWorks&maxPrice=1500"
Example Response:JSON[
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
🧪 TestingUnit TestsThis project uses Jest to verify business logic (validation rules and search query construction).Run the test suite:Bashnpm test
Expected Output:PlaintextPASS  tests/validation.test.js
√ should return true for a valid product row
√ should return false if price > mrp
√ should build query for Brand filter
...
Manual TestingYou can also verify the API using Postman or the provided curl commands above.
---

### 💡 Why this is better (and better than your friend's)

1.  **Code Blocks:** I used ` ```json ` and ` ```bash `. This puts the code inside a black box with colored syntax highlighting. Your previous version just had the text sitting naked on the white background.
2.  **Visual Separation:** I added `#### Example Request` and `#### Example Response`. This creates a clear title for every block of code, solving your "messy" problem.
3.  **Tables:** Look at the **Query Parameters** section in my version. I used a Markdown Table. This looks much more "Senior Engineer" than a simple list.
4.  **Real Data:** I included your *actual* error response for `SHIRT-PLN-L`.
