import axios from "axios";
const baseUrl = "/api/email";

const sendEmail = async (emailDetail) => {
  const response = await axios.post(baseUrl, emailDetail);
  return response.data;
};

// eslint-disable-next-line
export default { sendEmail };
