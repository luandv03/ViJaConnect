import { topicService } from "../../services/topics/topic.service.js";

export class TopicController {
    async createTopic(req, res) {
        try {
            const { title, desc } = req.body;
            const newTopic = await topicService.createTopic({ title, desc });
            return res.json({
                status: 201,
                message: "Topic created successfully",
                data: newTopic,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to create topic",
                error: error.message,
            });
        }
    }

    async getTopics(req, res) {
        try {
            const topics = await topicService.getTopics();
            return res.json({
                status: 200,
                message: "get topics successfully",
                data: topics,
            });
        } catch (error) {
            return res.json(error).status(500);
        }
    }

    async getTopicByTitle(req, res) {
        try {
            const { title } = req.query;
            const topic = await topicService.getTopicByTitle(title);
            return res.json({
                status: 200,
                message: "get topic by title successfully",
                data: topic,
            });
        } catch (error) {
            return res.json(error).status(500);
        }
    }
}
