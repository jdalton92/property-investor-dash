import axios from "axios";
import { getConfig } from "../utils/tokenHelper";
const baseUrl = "/api/users";

const create = async (userDetails) => {
  const response = await axios.post(baseUrl, userDetails);
  return response.data;
};

const update = async (id, userData) => {
  const response = await axios.put(`${baseUrl}/${id}`, userData, getConfig());
  return response.data;
};

const deleteUser = async (password, id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    data: { password },
  });
  return response.data;
};

// eslint-disable-next-line
export default { create, update, deleteUser };
