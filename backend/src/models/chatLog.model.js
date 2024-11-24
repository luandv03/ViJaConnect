import mongoose from "mongoose";

const chatLogSchema = new mongoose.Schema({
  chat_group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat_group",
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

export const ChatLog = mongoose.model("chat_log", chatLogSchema);
