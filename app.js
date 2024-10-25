import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import dotenv from "dotenv";
import Products from "./routes/product.js";
import User from "./routes/user.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

app.use("/products", Products);
app.use("/users", User);

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
