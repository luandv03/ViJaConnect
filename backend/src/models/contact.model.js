import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  contact_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: "chat_group" },
  type: { type: String, enum: ["user", "chat_group"], required: true },
  last_message: { type: String },
  last_active_timestamp: { type: Date, default: Date.now },
  unread_count: { type: Number, default: 0 },
});

export const Contact = mongoose.model("contact", contactSchema);
