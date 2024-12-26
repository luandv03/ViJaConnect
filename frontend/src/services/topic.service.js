import { BaseService } from "./base.service";

class TopicService extends BaseService {
    async createTopic({ title, desc, author_id }) {
        try {
            const res = await this.httpClientPublic.post("/topic/create", {
                title: title,
                desc: desc,
                author_id: author_id,
            });

            return res.data;
        } catch (error) {
            return error;
        }
    }

    async fetchTopics() {
        try {
            const res = await this.httpClientPublic.get("/topic/get");

            return res.data;
        } catch (error) {
            return error;
        }
    }
}

export const topicService = new TopicService();
