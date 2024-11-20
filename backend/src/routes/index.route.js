import { Router } from "express";
const router = Router();

import routerV1 from "./v1/v1.route.js";

router.use("/api", routerV1);

export default router;
