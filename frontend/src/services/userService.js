import axios from "axios";
const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`/api/user/forgot-password`, email, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText == "OK") {
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.error("Error sending forgot password request:", error);
    throw error;
  }
};
export default { forgotPassword };
