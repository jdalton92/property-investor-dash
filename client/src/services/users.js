import axios from "axios";
import { getAuthHeader } from "../utils/tokenHelper";
import { V1_API } from "../config";
const baseUrl = `${V1_API}/users`;

const createUser = async (userData) => {
  const response = await axios.post(baseUrl, userData);
  return response.data;
};

const updateUser = async (id, userData) => {
  const response = await axios.put(
    `${baseUrl}/${id}`,
    userData,
    getAuthHeader()
  );
  return response.data;
};

const deleteUser = async (id, password) => {
  const options = getAuthHeader();
  options.data = { password };
  const response = await axios.delete(`${baseUrl}/${id}`, options);
  return response.data;
};

// eslint-disable-next-line
export default { createUser, updateUser, deleteUser };
