import { postService } from "../../services/posts/post.service.js";

export class PostController {
    async getPosts(req, res) {
        try {
            const posts = await postService.getPosts();
            return res.json({
                status: 200,
                message: "get posts successfully",
                data: posts,
            });
        } catch (error) {
            return res.json(error).status(500);
        }
    }

    async createPost(req, res) {
        try {
            const { title, author_id, topic_ids, image_link, desc } = req.body;
            const newPost = await postService.createPost({
                title,
                author_id,
                topic_ids,
                image_link,
                desc,
            });
            return res.json({
                status: 201,
                message: "Post created successfully",
                data: newPost,
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
