import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  parent_comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "comment" }, // Optional parent comment
  likes: { type: Number, default: 0 },
  content: { type: String, required: true },
});

export const Comment = mongoose.model("comment", commentSchema);
