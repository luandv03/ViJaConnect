import { Router } from "express";

import postRoutes from "./posts/post.route.js";
import topicRoutes from "./topics/topic.route.js";

const routerV1 = Router();

routerV1.use("/v1", postRoutes);
routerV1.use("/v1", topicRoutes);

export default routerV1;
