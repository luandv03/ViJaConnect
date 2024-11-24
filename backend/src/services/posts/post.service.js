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

    async createPost(postData) {
        const newPost = new Post(postData);
        return await newPost.save();
    }
}

export const postService = new PostService();
