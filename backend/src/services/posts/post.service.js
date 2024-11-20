import { Post } from "../../models/post.model.js";

class PostService {
    async getPosts() {
        try {
            const posts = await Post.find({});

            return posts;
        } catch (error) {
            return error;
        }
    }
}

export const postService = new PostService();
