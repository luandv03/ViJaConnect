import { Router } from "express";

import postRoutes from "./posts/post.route.js";

const routerV1 = Router();

routerV1.use("/v1", postRoutes);

export default routerV1;
