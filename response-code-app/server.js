const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/lists");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://divyaakkim3:GcxDY19VNtWv0KzT@moengage.2yjutwc.mongodb.net/",
    {}
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
