import axios from "axios";
import { getAuthOptions } from "../utils/authHelper";
import { V1_API } from "../config";
const baseUrl = `${V1_API}/users`;

const createUser = async (userData) => {
  const options = getAuthOptions();
  const response = await axios.post(baseUrl, userData, options);
  return response.data;
};

const updateUser = async (id, userData) => {
  const options = getAuthOptions();
  const response = await axios.put(`${baseUrl}/${id}`, userData, options);
  return response.data;
};

const deleteUser = async (id, password) => {
  const options = getAuthOptions();
  options.data = { password };
  const response = await axios.delete(`${baseUrl}/${id}`, options);
  return response.data;
};

// eslint-disable-next-line
export default { createUser, updateUser, deleteUser };
