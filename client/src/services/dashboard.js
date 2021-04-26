import axios from "axios";
import { getAuthHeader } from "../utils/tokenHelper";
const baseUrl = "/api/dashboards";

const getAllDashboards = async (params = {}) => {
  const config = getAuthHeader();
  config.params = params;
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getDashboard = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, getAuthHeader());
  return response.data;
};

const saveDashboard = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getAuthHeader());
  return response.data;
};

const updateDashboard = async (newObject) => {
  const response = await axios.put(
    `${baseUrl}/${newObject._id}`,
    newObject,
    getAuthHeader()
  );
  return response.data;
};

const removeDashboard = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getAuthHeader());
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
