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
}
