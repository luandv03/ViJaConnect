// src/services/chatLogs/chatLog.service.js
import mongoose from "mongoose";
import { User } from "../../models/user.model.js";
import { Message } from "../../models/message.model.js";
import { Chat } from "../../models/chat.model.js";

class ChatService {
    // Get Chat By Id
    async getChatById(chatId, userId) {
        try {
            // Validate input
            if (
                !mongoose.Types.ObjectId.isValid(chatId) ||
                !mongoose.Types.ObjectId.isValid(userId)
            ) {
                return res
                    .status(400)
                    .json({ message: "Invalid chatId or userId" });
            }

            // Lấy thông tin chat
            const chat = await Chat.findById(chatId)
                .populate("users", "name email avatar_link") // Populate thông tin user
                .populate("latestMessage");

            if (!chat) {
                return res.status(404).json({ message: "Chat not found" });
            }

            // Xử lý avatar
            let avatar;
            if (!chat.isGroupChat) {
                // Chat 1-1: Lấy avatar của người dùng đối diện
                const otherUser = chat.users.find(
                    (user) => user._id.toString() !== userId
                );
                avatar = otherUser ? otherUser.avatar_link : null;
            } else {
                // Group chat: Lấy avatar của group
                avatar = chat.avatar;
            }

            // Trả về thông tin chat
            return {
                _id: chat._id,
                chatName: chat.isGroupChat
                    ? chat.chatName
                    : chat.users.find((user) => user._id.toString() !== userId)
                          ?.name,
                isGroupChat: chat.isGroupChat,
                users: chat.users,
                latestMessage: chat.latestMessage,
                avatar, // Avatar đã xử lý
            };
        } catch (error) {
            console.error(error);
        }
    }

    async getChatByUserId(userId) {
        try {
            // Validate userId
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid userId" });
            }

            // Lấy danh sách chat có sự tham gia của user
            const chats = await Chat.find({ users: userId })
                .populate("users", "name email avatar_link")
                .populate("latestMessage")
                .sort({ "latestMessage.createdAt": -1 });

            return chats;
        } catch (error) {
            console.error(error);
        }
    }

    // Get all messages by chatId
    async getMessagesByChatId(chatId) {
        try {
            // Validate chatId
            if (!mongoose.Types.ObjectId.isValid(chatId)) {
                return res.status(400).json({ message: "Invalid chatId" });
            }

            // Lấy danh sách tin nhắn theo chatId
            const messages = await Message.find({ chat: chatId }) // Lọc theo chatId
                .populate("sender", "name email avatar_link") // Tham chiếu thông tin người gửi
                .sort({ createdAt: 1 }); // Sắp xếp tin nhắn theo thời gian (từ cũ -> mới)

            return messages; // Trả danh sách tin nhắn
        } catch (error) {
            console.error(error);
        }
    }

    // Send message
    async sendMessage(senderId, chatId, content) {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (!senderId || !chatId || !content) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" });
            }

            // Validate senderId và chatId
            if (
                !mongoose.Types.ObjectId.isValid(senderId) ||
                !mongoose.Types.ObjectId.isValid(chatId)
            ) {
                return res
                    .status(400)
                    .json({ message: "Invalid senderId or chatId" });
            }

            // Tạo tin nhắn mới
            const newMessage = await Message.create({
                sender: senderId,
                chat: chatId,
                content,
            });

            // Cập nhật latestMessage trong Chat
            await Chat.findByIdAndUpdate(chatId, {
                latestMessage: newMessage._id,
            });

            // Populate thông tin người gửi và chat
            const populatedMessage = await Message.findById(newMessage._id)
                .populate("sender", "name email avatar_link")
                .populate("chat", "chatName isGroupChat users");

            // Trả về tin nhắn vừa gửi
            return populatedMessage;
        } catch (error) {
            console.error(error);
        }
    }

    // Get All Contacts By UserId
    async getUserContacts(userId) {
        try {
            // 🆔 Validate userId
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error("Invalid userId");
            }

            // 🔍 Tìm các cuộc chat có sự tham gia của user
            const chats = await Chat.aggregate([
                {
                    $match: {
                        users: { $in: [new mongoose.Types.ObjectId(userId)] },
                    },
                },
                { $unwind: "$users" }, // Tách từng user trong danh sách users
                {
                    $match: {
                        users: { $ne: new mongoose.Types.ObjectId(userId) }, // Loại bỏ chính user đó
                    },
                },
                {
                    $lookup: {
                        from: "users", // Liên kết với collection User
                        localField: "users",
                        foreignField: "_id",
                        as: "contactDetails",
                    },
                },
                {
                    $unwind: {
                        path: "$contactDetails",
                        preserveNullAndEmptyArrays: false,
                    },
                },
                {
                    $group: {
                        _id: "$contactDetails._id", // Loại bỏ trùng lặp contacts
                        name: { $first: "$contactDetails.name" },
                        email: { $first: "$contactDetails.email" },
                        phone_number: {
                            $first: "$contactDetails.phone_number",
                        },
                        createdAt: { $first: "$contactDetails.createdAt" },
                    },
                },
                { $sort: { createdAt: -1 } }, // Sắp xếp theo thời gian gần nhất
            ]);

            return chats; // 📋 Trả về danh sách contact
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching contacts");
        }
    }

    async createGroupChat(chatName, userId, users) {
        try {
            // Validate input
            if (!chatName || !userId || !users || !Array.isArray(users)) {
                return res
                    .status(400)
                    .json({ message: "Invalid data provided" });
            }

            // Validate userId
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid userId" });
            }

            // Kiểm tra xem người tạo nhóm có tồn tại không
            const admin = await User.findById(userId);
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            const fakeAvatar = [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsbvYmsy3S5mLR977mNfoXJraS_YTMu_8Q9A&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCQjcifT1rFo2HaLWTVwwuSXX1L7gqFbAUOw&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBbm2pa8GeS4ePCaHqoBAkyqCZ4E4y4P9vsQ&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa5omhlpFbVmT3XpX7IrcVXfxTcKwk-F5FvQ&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjkEkny2ArthGwyBxg2OMY-aA0mgdWqSll4A&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmD_pc_8k4-TECvwV711LwPWGJ0SN34d6Smw&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9Wm-vAFT9ME9T547Brf4A5fNLPhSz6Xe0A&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCNzor1ujsOefKEwvmn_ZagCNWirp1TuqPfw&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLHGn1IwJDD8ElS3Lm8kbABKleBTNIrT2h5w&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC3EPnM9--FnFTnbIAxg-KBwbPMv-_cDlKJQ&s",
            ];

            const randomAvatar =
                fakeAvatar[Math.floor(Math.random() * fakeAvatar.length)];

            // Tạo nhóm chat mới
            const groupChat = await Chat.create({
                chatName,
                isGroupChat: true,
                users: [userId, ...users], // Thêm admin vào đầu danh sách users
                avatar: randomAvatar,
                groupAdmin: userId,
            });

            // Populate thông tin nhóm chat và users
            const populatedChat = await Chat.findById(groupChat._id).populate(
                "users",
                "name email avatar_link"
            );

            // Trả về thông tin nhóm chat
            return populatedChat;
        } catch (error) {
            console.error(error);
        }
    }

    // get users not in group chat
    async getUsersNotInGroupChat(chatId) {
        try {
            // Validate input
            if (!mongoose.Types.ObjectId.isValid(chatId)) {
                return res.status(400).json({ message: "Invalid chatId" });
            }

            // Lấy thông tin nhóm chat
            const chat = await Chat.findById(chatId);
            if (!chat) {
                return res.status(404).json({ message: "Chat not found" });
            }

            // Lấy danh sách users không thuộc nhóm chat
            const users = await User.find({
                _id: { $nin: chat.users },
            }).select("name email avatar_link");

            return users;
        } catch (error) {
            console.error(error);
        }
    }
}

export const chatService = new ChatService();
