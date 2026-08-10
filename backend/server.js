const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

console.log("MY PORTFOLIO BACKEND CODE IS RUNNING");

// Middleware
app.use(cors());
app.use(express.json());

// ==============================
// TEST ROUTE
// ==============================
app.get("/", (req, res) => {
  res.status(200).send("Portfolio Backend Running");
});

// ==============================
// HEALTH CHECK
// ==============================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is running"
  });
});

// ==============================
// PROJECT ROUTES
// ==============================
const projectRoutes = require("./routes/projectRoutes");

app.use("/projects", projectRoutes);

// ==============================
// PORT
// ==============================
const PORT = process.env.PORT || 5000;

// ==============================
// MONGODB + SERVER
// ==============================
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000
  })
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:");
    console.error(err.message);
  });