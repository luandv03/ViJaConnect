import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
        groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        avatar: { type: String, default: "https://t.ly/YjTlg" }, // Link ảnh nhóm
    },
    {
        timestamps: true,
    }
);

export const Chat = mongoose.model("chat", chatSchema);
