// src/controllers/chatLogs/chatLog.controller.js
import { chatLogService } from "../../services/chatLogs/chatLog.service.js";

export class ChatLogController {
  async getChatLogsByGroupId(req, res) {
    try {
      const groupId = req.params.groupId;
      const chatLogs = await chatLogService.getChatLogsByGroupId(groupId);
      return res.json({
        status: 200,
        message: "Chat logs fetched successfully",
        data: chatLogs,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Failed to fetch chat logs",
        error: error.message,
      });
    }
  }

  async createChatLog(req, res) {
    try {
      const chatLogData = req.body;
      const newChatLog = await chatLogService.createChatLog(chatLogData);
      return res.json({
        status: 201,
        message: "Chat log created successfully",
        data: newChatLog,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Failed to create chat log",
        error: error.message,
      });
    }
  }
}
