import { Router } from "express";
import { TopicController } from "../../../controllers/topics/topic.controller.js";

const topicRoutes = Router();
const topicController = new TopicController();

topicRoutes.post("/topic/create", topicController.createTopic);
// get topic by title
topicRoutes.get("/topic/get", topicController.getTopicByTitle);

// get all topics
topicRoutes.get("/topic/get", topicController.getTopics);

export default topicRoutes;
