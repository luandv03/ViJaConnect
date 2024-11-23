import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
});

export const Topic = mongoose.model("topic", topicSchema);
