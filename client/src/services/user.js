import axios from "axios";
import { getAuthHeader } from "../utils/tokenHelper";
const baseUrl = "/api/users";

const create = async (userData) => {
  const response = await axios.post(baseUrl, userData);
  return response.data;
};

const update = async (id, userData) => {
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

const setNewPassword = async (id, token, password, checkPassword) => {
  const response = await axios.post(`${baseUrl}/reset-password`, {
    id,
    token,
    password,
    checkPassword,
  });
  return response.data;
};

// eslint-disable-next-line
export default { create, update, deleteUser, setNewPassword };
