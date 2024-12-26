import axios from "axios";

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

export const createPost = async (payload) => {
  try {
    console.log("Payload to be sent:", payload); // Log the payload to be sent
    const { data } = await axios.post(`http://${SERVER_DOMAIN}/api/v1/post/create`, payload);
    console.log("Data received:", data); // Log the data received
    return data;
  } catch (error) {
    console.error("Failed to create post", error);
    throw error;
  }
};
