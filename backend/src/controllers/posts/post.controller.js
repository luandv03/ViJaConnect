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
}
