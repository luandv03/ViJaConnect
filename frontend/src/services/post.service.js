import axios from "axios";

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

export const createPost = async (payload) => {
    try {
        console.log("Payload to be sent:", payload); // Log the payload to be sent
        const { data } = await axios.post(
            `${SERVER_DOMAIN}/api/v1/post/create`,
            payload
        );
        console.log("Data received:", data); // Log the data received
        return data;
    } catch (error) {
        console.error("Failed to create post", error);
        throw error;
    }
};

export const getPostsByTopicId = async (topicId) => {
    try {
        const { data } = await axios.get(
            `${SERVER_DOMAIN}/api/v1/post/get/topic/${topicId}`
        );
        return data.data;
    } catch (error) {
        console.error("Failed to get post", error);
        throw error;
    }
};

export const getPosts = async () => {
    try {
        const { data } = await axios.get(`${SERVER_DOMAIN}/api/v1/post/get`);
        return data.data;
    } catch (error) {
        console.error("Failed to get post", error);
        throw error;
    }
};

export const getPost = async (postId) => {
    try {
        const { data } = await axios.get(
            `${SERVER_DOMAIN}/api/v1/post/get/${postId}`
        );
        return data.data;
    } catch (error) {
        console.error("Failed to get post", error);
        throw error;
    }
};

export const getPostByAuthor = async (authorId) => {
    try {
        const { data } = await axios.get(
            `${SERVER_DOMAIN}/api/v1/post/get/author/${authorId}`
        );
        return data.data;
    } catch (error) {
        console.error("Failed to get post", error);
        throw error;
    }
};
