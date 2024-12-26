import axios from "axios";

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

export const fetchTopics = async () => {
  try {
    const { data } = await axios.get(`http://${SERVER_DOMAIN}/api/v1/topic/get`);
    return data.data;
  } catch (error) {
    console.error("Failed to fetch topics", error);
    throw error;
  }
};
