import { Router } from "express";

import postRoutes from "./posts/post.route.js";
import topicRoutes from "./topics/topic.route.js";
import chatRoutes from "./chats/chat.route.js";
import eventRoutes from "./events/event.route.js";
import userRoutes from "./users/user.route.js";
import authRoutes from "./auth/auth.route.js";
import uploadRoutes from "./upload/upload.route.js";
import locationRoutes from "./location/location.route.js";

const routerV1 = Router();

routerV1.use("/v1", postRoutes);
routerV1.use("/v1", topicRoutes);
routerV1.use("/v1", chatRoutes);
routerV1.use("/v1", eventRoutes);
routerV1.use("/v1", userRoutes);
routerV1.use("/v1", authRoutes);
routerV1.use("/v1", uploadRoutes);
routerV1.use("/v1", locationRoutes);

export default routerV1;
