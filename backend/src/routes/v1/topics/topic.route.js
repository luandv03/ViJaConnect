import { Router } from "express";
import { TopicController } from "../../../controllers/topics/topic.controller.js";

const topicRoutes = Router();
const topicController = new TopicController();

topicRoutes.post("/topic/create", topicController.createTopic);
postRoutes.get("/topic/get", topicController.getTopics);

export default topicRoutes;
