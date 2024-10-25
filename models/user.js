import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  gander: { type: String, required: true },
  phonenumber: { type: String, required: false, unique: true },
  birthday: { type: String, required: false },
  role: { type: String, default: "user" },
  cart: { type: Array, default: [] },
});

export default mongoose.model("User", userSchema);
