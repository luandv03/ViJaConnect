import { BaseService } from "./base.service";

class ChatService extends BaseService {
    async getChatById(chatId, userId) {
        try {
            const res = await this.httpClientPublic.get(
                `/chat/${chatId}/user/${userId}`
            );

            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getChatByUserId(userId) {
        try {
            const res = await this.httpClientPublic.get(`/chat/user/${userId}`);

            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getMessagesByChatId(chatId) {
        try {
            const res = await this.httpClientPublic.get(
                `chat/${chatId}/messages`
            );

            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    async sendMessage(chatId, senderId, content) {
        try {
            const res = await this.httpClientPublic.post(
                `/chat/${chatId}/send`,
                {
                    senderId,
                    content,
                }
            );

            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getUserContacts(userId) {
        try {
            const res = await this.httpClientPublic.get(
                `/chat/contact/all/${userId}`
            );

            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    // userId: groupAdmin
    async createGroupChat(chatName, userId, users) {
        try {
            const res = await this.httpClientPublic.post("/chat/create-group", {
                chatName,
                userId,
                users,
            });

            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getUsersNotInGroupChat(chatId, username) {
        try {
            const res = await this.httpClientPublic.get(
                `/chat/group/${chatId}/users-not-in-group?username=${username}`
            );

            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    async addUserIntoGroupChat(chatId, users) {
        try {
            const res = await this.httpClientPublic.post(
                `/chat/group/${chatId}/add-user`,
                {
                    users,
                }
            );

            return res.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export const chatService = new ChatService();
