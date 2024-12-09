import { Router } from "express";

import postRoutes from "./posts/post.route.js";
import topicRoutes from "./topics/topic.route.js";
import chatLogRoutes from "./chatLogs/chatLog.route.js";
import eventRoutes from "./events/event.route.js";
import userRoutes from "./users/user.route.js";

const routerV1 = Router();

routerV1.use("/v1", postRoutes);
routerV1.use("/v1", topicRoutes);
routerV1.use("/v1", chatLogRoutes);
routerV1.use("/v1", eventRoutes);
routerV1.use("/v1", userRoutes);

export default routerV1;
