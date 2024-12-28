// src/controllers/chatLogs/chatLog.controller.js
import { chatService } from "../../services/chats/chat.service.js";

export class ChatController {
    // Get Chat By Id
    async getChatById(req, res) {
        try {
            const { chatId, userId } = req.params;

            const chat = await chatService.getChatById(chatId, userId);

            return res.json({
                status: 200,
                message: "Chat fetched successfully",
                data: chat,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to fetch chat",
                error: error.message,
            });
        }
    }

    async getChatByUserId(req, res) {
        try {
            const { userId } = req.params;

            const chat = await chatService.getChatByUserId(userId);

            return res.json({
                status: 200,
                message: "Chat fetched by user successfully",
                data: chat,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to fetch chat",
                error: error.message,
            });
        }
    }

    // Get All Messages By Chat Id
    async getMessagesByChatId(req, res) {
        try {
            const { chatId } = req.params;

            const messages = await chatService.getMessagesByChatId(chatId);

            return res.json({
                status: 200,
                message: "Messages fetched successfully",
                data: messages,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to fetch messages",
                error: error.message,
            });
        }
    }

    // Create Message
    async sendMessage(req, res) {
        try {
            const { chatId } = req.params;
            const { senderId, content } = req.body;

            const message = await chatService.sendMessage(
                senderId,
                chatId,
                content
            );

            return res.json({
                status: 201,
                message: "Message sent successfully",
                data: message,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to send message",
                error: error.message,
            });
        }
    }

    // Get All Contacts By UserId
    async getUserContacts(req, res) {
        try {
            const { userId } = req.params;

            const contacts = await chatService.getUserContacts(userId);

            return res.json({
                status: 200,
                message: "Contacts fetched successfully",
                data: contacts,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to fetch contacts",
                error: error.message,
            });
        }
    }

    // Create Group Chat
    async createGroupChat(req, res) {
        try {
            const { chatName, userId, users } = req.body;

            const chat = await chatService.createGroupChat(
                chatName,
                userId,
                users
            );

            return res.json({
                status: 201,
                message: "Group chat created successfully",
                data: chat,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to create group chat",
                error: error.message,
            });
        }
    }

    // get users not in group chat
    async getUsersNotInGroupChat(req, res) {
        try {
            const { chatId } = req.params;

            const users = await chatService.getUsersNotInGroupChat(chatId);

            return res.json({
                status: 200,
                message: "Users Search fetched successfully",
                data: users,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to fetch users",
                error: error.message,
            });
        }
    }
}
