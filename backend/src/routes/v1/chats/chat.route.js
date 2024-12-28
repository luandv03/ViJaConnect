// src/routes/v1/chatLogs/chatLog.route.js
import { Router } from "express";
import { ChatController } from "../../../controllers/chats/chat.controller.js";

const chatRoutes = Router();
const chatController = new ChatController();

chatRoutes.get("/chat/:chatId/user/:userId", chatController.getChatById);

// get chats by user id
chatRoutes.get("/chat/user/:userId", chatController.getChatByUserId);

chatRoutes.get("/chat/:chatId/messages", chatController.getMessagesByChatId);
chatRoutes.post("/chat/:chatId/send", chatController.sendMessage);

// Create Chat Group
chatRoutes.post("/chat/create-group", chatController.createGroupChat);

// Get User Contacts
chatRoutes.get("/chat/contact/all/:userId", chatController.getUserContacts);

// get users not in group chat
chatRoutes.get(
    "/chat/group/:chatId/users-not-in-group",
    chatController.getUsersNotInGroupChat
);

export default chatRoutes;
