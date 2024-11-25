import { Topic } from "../../models/topic.model.js";

class TopicService {
    async createTopic({ title, desc }) {
        try {
            const newTopic = new Topic({ title, desc });
            return await newTopic.save(); // Save the topic to the database
        } catch (error) {
            throw new Error("Error creating topic: " + error.message);
        }
    }

    async getTopics() {
        try {
            const topics = await Topic.find({});

            return topics;
        } catch (error) {
            return error;
        }
    }
}

export const topicService = new TopicService();