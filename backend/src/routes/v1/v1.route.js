import { Router } from "express";

import postRoutes from "./posts/post.route.js";
import topicRoutes from "./topics/topic.route.js";
import chatLogRoutes from "./chatLogs/chatLog.route.js";
const routerV1 = Router();

routerV1.use("/v1", postRoutes);
routerV1.use("/v1", topicRoutes);
routerV1.use("/v1", chatLogRoutes);

export default routerV1;
