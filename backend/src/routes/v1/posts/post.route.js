import { Router } from "express";

import { PostController } from "../../../controllers/posts/post.controller.js";

const postRoutes = Router();
const postController = new PostController();

postRoutes.get("/post/get", postController.getPosts);
postRoutes.get("/post/get/search", postController.getPostByTitle);
postRoutes.get("/post/get/:postId", postController.getPostById);
postRoutes.get("/post/get/topic/:topicId", postController.getPostByTopicId);
postRoutes.get("/post/get/author/:authorId", postController.getPostByAuthor);
postRoutes.post("/post/create", postController.createPost);

export default postRoutes;
