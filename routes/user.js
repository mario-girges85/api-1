import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
	const users = await User.find();
	res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
	const user = await User.findById(req.params.id);
	res.status(200).json(user);
  } catch (error) {
	res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
	const newUser = new User(req.body);
	const savedUser = await newUser.save();
	res.status(201).json(savedUser);
  } catch (error) {
	res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
	const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(201).json(updatedUser);
  } catch (error) {
	res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
	const user = await User.findByIdAndDelete(req.params.id);
	res.json({ message: "user deleted" });
  } catch (error) {
	res.status(500).json({ message: error.message });
  }
});

export default router;
