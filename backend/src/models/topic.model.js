import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
});

export const Topic = mongoose.model("topic", topicSchema);
