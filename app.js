const express = require("express");
const app = express(); // Initialize the app

const productRoutes = require("./routes/productRoutes");
const HttpError = require("./models/http-error");

// 1. Parse incoming JSON data (so we can read req.body)
app.use(express.json());

// 2. Connect our Product Routes
// Any URL starting with /api/products will go to our productRoutes file
app.use("/", productRoutes);

// 3. Handle "Route Not Found"
// If a user goes to a link we didn't define (like /api/unknown), this runs.
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// 4. Global Error Handler
// If any part of our app throws an error (like DB failed), this function catches it.
app.use((error, req, res, next) => {
  // If we already sent a response, don't send another one
  if (res.headerSent) {
    return next(error);
  }
  
  // Send the error message and code (default to 500/Server Error)
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

// 5. Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});