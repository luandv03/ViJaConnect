import mongoose from "mongoose";

const chatGroupSchema = new mongoose.Schema({
  group_name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // List of user IDs
  created_at: { type: Date, default: Date.now },
});

export const ChatGroup = mongoose.model("chat_group", chatGroupSchema);
