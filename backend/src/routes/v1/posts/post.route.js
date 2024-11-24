import { Router } from "express";

import { PostController } from "../../../controllers/posts/post.controller.js";

const postRoutes = Router();
const postController = new PostController();

postRoutes.get("/post/get", postController.getPosts);
postRoutes.post("/post/create", postController.createPost);

export default postRoutes;
