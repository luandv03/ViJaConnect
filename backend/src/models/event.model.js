import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  location: { type: String },
  date: { type: Date, required: true },
  banner_link: { type: String },
  joined_users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // Thêm thuộc tính joined_users
});

export const Event = mongoose.model("event", eventSchema);
