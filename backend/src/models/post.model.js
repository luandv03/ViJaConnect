import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: { type: Date, default: Date.now },
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "topic" }, // Array of topics
  likes: { type: Number, default: 0 },
  image_link: { type: String },
  desc: {
    type: String,
  },
});

export const Post = mongoose.model("post", postSchema);
