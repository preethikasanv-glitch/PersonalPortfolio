const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const projectRoutes = require("./routes/projectRoutes");

app.use("/projects", projectRoutes);

app.get("/", (req, res) => {
    res.send("Portfolio Backend Running");
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000
    })
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:");
        console.error(err.message);
    });