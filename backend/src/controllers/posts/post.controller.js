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

    async getPostById(req, res) {
        try {
            const { postId } = req.params;
            const post = await postService.getPostById(postId);
            return res.json({
                status: 200,
                message: "get post by id successfully",
                data: post,
            });
        } catch (error) {
            return res.json(error).status(500);
        }
    }

    async getPostByTopicId(req, res) {
        try {
            const { topicId } = req.params;
            const posts = await postService.getPostByTopicId(topicId);
            return res.json({
                status: 200,
                message: "get post by topic id successfully",
                data: posts,
            });
        } catch (error) {
            return res.json(error).status(500);
        }
    }

    async getPostByAuthor(req, res, next) {
        try {
            const { authorId } = req.params;
            const posts = await postService.getPostByAuthor(authorId);
            return res.json({
                status: 200,
                message: "get post by author successfully",
                data: posts,
            });
        } catch (error) {
            return res.json(error).status(500);
        }
    }

    async getPostByTitle(req, res) {
        try {
            const { title } = req.query;
            const posts = await postService.getPostByTitle(title);
            return res.json({
                status: 200,
                message: "get post by title successfully",
                data: posts,
            });
        } catch (error) {
            return res.json(error).status(500);
        }
    }

    async createPost(req, res) {
        try {
            const { title, author_id, topic_id, image_link, desc } = req.body;
            const newPost = await postService.createPost({
                title,
                author_id,
                topic_id,
                image_link,
                desc,
            });
            return res.json({
                status: 201,
                message: "Post created successfully",
                data: newPost,
            });
        } catch (error) {
            console.error("Error in createPost:", error); // Log the error
            return res.status(500).json(error);
        }
    }
}
