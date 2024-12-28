import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        ],
        latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "message" },
        groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        avatar: {
            type: String,
            default:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fvRATLApWGN3kNsceiuLDW62rnXgwtbL8A&s",
        },
    },
    {
        timestamps: true,
    }
);

export const Chat = mongoose.model("chat", chatSchema);
