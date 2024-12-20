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
    shared_posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    liked_posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    settings: {
        notification: { type: Boolean, default: true },
        dark_mode: { type: Boolean, default: false },
        language: { type: String, default: "jap" },
    },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "contact" }],
    point: { type: Number, default: 0 },
});

export const User = mongoose.model("user", userSchema);
