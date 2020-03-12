import axios from "axios";
import { getConfig } from "../helpers/tokenHelper";
const baseUrl = "/api/users";

const create = async userDetails => {
  const response = await axios.post(baseUrl, userDetails);
  return response.data;
};

const update = async userDetails => {
  const response = await axios.put(
    `${baseUrl}/${userDetails.id}`,
    userDetails,
    getConfig()
  );
  return response.data;
};

const deleteUser = async (password, id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    data: { password }
  });
  return response.data;
};

export default { create, update, deleteUser };
