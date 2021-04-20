import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const demo = async () => {
  const response = await axios.post(`${baseUrl}/demo`);
  return response.data;
};

// eslint-disable-next-line
export default { login, demo };
