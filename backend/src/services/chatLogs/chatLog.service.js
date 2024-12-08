// src/services/chatLogs/chatLog.service.js
import { ChatLog } from "../../models/chatLog.model.js";

class ChatLogService {
  async getChatLogsByGroupId(groupId) {
    try {
      const chatLogs = await ChatLog.find({ chat_group_id: groupId })
        .sort({ date: -1 })
        .populate("author_id", "name email avatar_link"); // Sort by date in descending order
      return chatLogs;
    } catch (error) {
      throw new Error("Error fetching chat logs: " + error.message);
    }
  }
  async createChatLog(chatLogData) {
    try {
      const newChatLog = new ChatLog(chatLogData);
      await newChatLog.save();
      return newChatLog;
    } catch (error) {
      throw new Error("Error creating chat log: " + error.message);
    }
  }
}

export const chatLogService = new ChatLogService();
