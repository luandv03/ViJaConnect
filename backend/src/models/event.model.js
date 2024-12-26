import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        desc: { type: String },
        location: { type: String },
        date: { type: Date, required: true },
        banner_link: { type: String },
        author_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // Thêm thuộc tính author_id
        joined_users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // Thêm thuộc tính joined_users
    },
    { timestamps: true }
);

export const Event = mongoose.model("event", eventSchema);
