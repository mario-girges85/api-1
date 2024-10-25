import express from "express";
import multer from "multer";
import Product from "../models/product.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    !product && res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new Product({
      code: req.body.code,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      rating: req.body.rating,
      image: req.file ? req.file.path : "",
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        code: req.body.code,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        rating: req.body.rating,
        image: req.file ? req.file.path : req.body.image,
      },
      { new: true }
    );
    !updatedProduct && res.status(404).json({ message: "Product not found" });
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    !product && res.status(404).json({ message: "Product not found" });
    res.json({ message: "product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
