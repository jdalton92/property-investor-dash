import axios from "axios";
import { getConfig } from "../helpers/tokenHelper";
const baseUrl = "/api/dashboards";

const getAllDash = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

const getDash = async (id) => {
  console.log(getConfig());
  const response = await axios.get(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

const saveDash = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const updateDash = async (newObject) => {
  const response = await axios.put(
    `${baseUrl}/${newObject._id}`,
    newObject,
    getConfig()
  );
  return response.data;
};

const removeDash = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export default {
  getAllDash,
  getDash,
  saveDash,
  updateDash,
  removeDash,
};