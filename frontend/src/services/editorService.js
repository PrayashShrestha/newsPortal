import axios from "axios";
const basePath = `/api/editor`;
const postArticle = async (postImage, content) => {
  const formData = new FormData();
  formData.append("image", postImage);
  formData.append("content", content);
  try {
    const response = await axios.post(`${basePath}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response from backend:", response.data);
  } catch (error) {
    console.error("Error saving content:", error);
  }
};

export default {
  postArticle,
};
