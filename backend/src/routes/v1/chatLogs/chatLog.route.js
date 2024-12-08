// src/routes/v1/chatLogs/chatLog.route.js
import { Router } from "express";
import { ChatLogController } from "../../../controllers/chatLogs/chatLog.controller.js";

const chatLogRoutes = Router();
const chatLogController = new ChatLogController();

chatLogRoutes.get(
  "/chat-logs/:groupId",
  chatLogController.getChatLogsByGroupId
);
chatLogRoutes.post("/chat-logs", chatLogController.createChatLog);

export default chatLogRoutes;
