import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
  },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
});
const userModel = model("User", userSchema);
export default userModel;
