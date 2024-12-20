// src/routes/v1/chatLogs/chatLog.route.js
import { Router } from "express";
import { ChatController } from "../../../controllers/chats/chat.controller.js";

const chatRoutes = Router();
const chatController = new ChatController();

chatRoutes.get("/chat/:chatId", chatController.getChatById);
chatRoutes.get(
    "/chat/:chatId/messages/:userId",
    chatController.getMessagesByChatId
);
chatRoutes.post("/chat/:chatId/send", chatController.sendMessage);

// Create Chat Group
chatRoutes.post("/chat/create-group", chatController.createGroupChat);

// Get User Contacts
chatRoutes.get("/chat/contact/all/:userId", chatController.getUserContacts);

export default chatRoutes;
