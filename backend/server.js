const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const projectRoutes = require("./routes/projectRoutes");
app.use("/projects", projectRoutes);

// Test route
app.get("/", (req, res) => {
    res.status(200).send("Portfolio Backend Running");
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Backend is running"
    });
});

const PORT = process.env.PORT || 10000;

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