import axios from "axios";
import { getConfig } from "../utils/tokenHelper";
const baseUrl = "/api/dashboards";

const getAllDashboards = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

const getDashboard = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

const saveDashboard = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const updateDashboard = async (newObject) => {
  const response = await axios.put(
    `${baseUrl}/${newObject._id}`,
    newObject,
    getConfig()
  );
  return response.data;
};

const removeDashboard = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

// eslint-disable-next-line
export default {
  getAllDashboards,
  getDashboard,
  saveDashboard,
  updateDashboard,
  removeDashboard,
};
