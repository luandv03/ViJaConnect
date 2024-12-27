import axios from "axios";

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${SERVER_DOMAIN}/api/v1/upload/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to upload image");
  }
};
