import axios from "axios";
import { getAuthConfig } from "../utils/authHelper";
import { V1_API } from "../config";
const baseUrl = `${V1_API}/users`;

const createUser = async (userData) => {
  const config = getAuthConfig();
  const response = await axios.post(baseUrl, userData, config);
  return response.data;
};

const updateUser = async (id, userData) => {
  const config = getAuthConfig();
  const response = await axios.put(`${baseUrl}/${id}`, userData, config);
  return response.data;
};

const deleteUser = async (id, password) => {
  const config = getAuthConfig();
  config.data = { password };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

// eslint-disable-next-line
export default { createUser, updateUser, deleteUser };
