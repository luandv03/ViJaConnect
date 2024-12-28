import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";
import { Topic } from "../../models/topic.model.js";

class PostService {
    async getPosts() {
        try {
            const posts = await Post.find({})
                .populate({
                    path: "author_id",
                    select: "avatar_link display_name",
                    as: "author",
                })
                .populate({ path: "topic_id", select: "title" })
                .sort({ createdAt: -1 })
                .lean();

            // Sửa tên trường author_id thành author
            posts.forEach((post) => {
                if (post.author_id) {
                    post.author = post.author_id; // Gán dữ liệu của author_id cho author
                    post.topic = post.topic_id; // Gán dữ liệu của topic_id cho topic
                    delete post.author_id; // Xóa trường author_id
                    delete post.topic_id; // Xóa trường topic
                }
            });

            return posts;
        } catch (error) {
            return error;
        }
    }

    async getPostById(postId) {
        try {
            const post = await Post.findById(postId)
                .populate({
                    path: "author_id",
                    select: "avatar_link display_name",
                })
                .populate({ path: "topic_id", select: "title" })
                .lean();

            if (post) {
                post.author = post.author_id;
                post.topic = post.topic_id;
                delete post.author_id;
                delete post.topic_id;
            }

            return post;
        } catch (error) {
            return error;
        }
    }

    async getPostByTopicId(topicId) {
        try {
            const posts = await Post.find({ topic_id: topicId })
                .populate({
                    path: "author_id",
                    select: "avatar_link display_name",
                })
                .populate({ path: "topic_id", select: "title" })
                .sort({ createdAt: -1 })
                .lean();

            // Sửa tên trường author_id thành author
            posts.forEach((post) => {
                if (post.author_id) {
                    post.author = post.author_id; // Gán dữ liệu của author_id cho author
                    post.topic = post.topic_id; // Gán dữ liệu của topic_id cho topic
                    delete post.author_id; // Xóa trường author_id
                    delete post.topic_id; // Xóa trường topic
                }
            });

            return posts;
        } catch (error) {
            return error;
        }
    }

    async getPostByAuthor(authorId) {
        try {
            const posts = await Post.find({ author_id: authorId }).sort({
                createdAt: -1,
            });
            return posts;
        } catch (error) {
            return error;
        }
    }

    async getPostByTitle(title) {
        try {
            const posts = await Post.find({
                title: { $regex: new RegExp(title, "i") },
            })
                .populate({
                    path: "author_id",
                    select: "avatar_link display_name",
                    as: "author",
                })
                .populate({ path: "topic_id", select: "title" })
                .sort({ createdAt: -1 })
                .lean();

            // Sửa tên trường author_id thành author
            posts.forEach((post) => {
                if (post.author_id) {
                    post.author = post.author_id; // Gán dữ liệu của author_id cho author
                    post.topic = post.topic_id; // Gán dữ liệu của topic_id cho topic
                    delete post.author_id; // Xóa trường author_id
                    delete post.topic_id; // Xóa trường topic
                }
            });
            return posts;
        } catch (error) {
            return error;
        }
    }

    async gePostByTopicAndTitle(topicId, title) {
        try {
            const posts = await Post.find({
                topic_id: topicId,
                title: { $regex: new RegExp(title, "i") },
            })
                .populate({
                    path: "author_id",
                    select: "avatar_link display_name",
                    as: "author",
                })
                .populate({ path: "topic_id", select: "title" })
                .sort({ createdAt: -1 })
                .lean();

            // Sửa tên trường author_id thành author
            posts.forEach((post) => {
                if (post.author_id) {
                    post.author = post.author_id; // Gán dữ liệu của author_id cho author
                    post.topic = post.topic_id; // Gán dữ liệu của topic_id cho topic
                    delete post.author_id; // Xóa trường author_id
                    delete post.topic_id; // Xóa trường topic
                }
            });
            return posts;
        } catch (error) {
            return error;
        }
    }

    async createPost(postData) {
        try {
            const newPost = new Post(postData);

            const savedPost = await newPost.save();

            // Populate the author_id and topic_id fields
            const populatedPost = await Post.findById(savedPost._id)
                .populate({
                    path: "author_id",
                    select: "avatar_link display_name",
                    as: "author",
                })
                .populate({ path: "topic_id", select: "title" })
                .lean();

            if (populatedPost.author_id) {
                populatedPost.author = populatedPost.author_id; // Gán dữ liệu của author_id cho author
                populatedPost.topic = populatedPost.topic_id; // Gán dữ liệu của topic_id cho topic
                delete populatedPost.author_id; // Xóa trường author_id
                delete populatedPost.topic_id; // Xóa trường topic
            }

            return populatedPost;
        } catch (error) {
            return error;
        }
    }

    async deletePost(postId) {
        try {
            const deletedEPost = await Post.findByIdAndDelete(postId);
            if (!deletedEPost) {
                throw new Error("Post not found or failed to delete");
            }
            return deletedEPost;
        } catch (error) {
            throw new Error("Error deleting post: " + error.message);
        }
    }
}

export const postService = new PostService();
