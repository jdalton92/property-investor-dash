import axios from "axios";
const baseUrl = "/api/email";

const sendEmail = async emailDetail => {
  const response = await axios.post(baseUrl, emailDetail);
  return response.data;
};

export default { sendEmail };
