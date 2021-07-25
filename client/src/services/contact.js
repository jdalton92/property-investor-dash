import axios from "axios";
import { V1_API } from "../constants/constants";
const baseUrl = `${V1_API}/contact`;

const sendEmail = async (emailDetail) => {
  const response = await axios.post(baseUrl, emailDetail);
  return response.data;
};

// eslint-disable-next-line
export default { sendEmail };
