import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Products from "./routes/product.js";
import User from "./routes/user.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); 
});

app.use("/products", Products);
app.use("/users", User);

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
