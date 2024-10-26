import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Products from "./routes/product.js";
import User from "./routes/user.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const corsOptions = {
  origin: "http://localhost:5173/", // Replace with your frontend's URL
  origin: "https://ecommercedepi.vercel.app/", // Replace with your frontend's URL
};
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
app.get("/", (req, res) => {
  res.send("<a href='/products'>Products</a> | <a href='/users'>Users</a>");
});
app.use("/products", Products);
app.use("/users", User);

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
