import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String },
  password: { type: String, required: true },
  display_name: { type: String },
  department: { type: String },
  address: { type: String },
  company_role: { type: String },
  avatar_link: { type: String },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
    required: true,
  },
  chat_group_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "chat_group" }], // Array of group IDs
  settings: {
    notification: { type: Boolean, default: true },
    dark_mode: { type: Boolean, default: false },
    language: { type: String, default: "en" },
  },
});

export const User = mongoose.model("user", userSchema);
