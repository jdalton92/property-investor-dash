import axios from "axios";
const baseUrl = "/api/login";

const login = async (email, password) => {
  const response = await axios.post(baseUrl, { email, password });
  return response.data;
};

const demo = async () => {
  const response = await axios.post(`${baseUrl}/demo`);
  return response.data;
};

const resetPassword = async (email) => {
  const response = await axios.post(`${baseUrl}/reset-password`, { email });
  return response.data;
};

// eslint-disable-next-line
export default { login, demo, resetPassword };
