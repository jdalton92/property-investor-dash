import axios from "axios";
import { getAuthHeader } from "../utils/tokenHelper";
import { V1_API } from "../config";
const baseUrl = `${V1_API}/dashboards`;

const getDashboards = async (params = {}) => {
  const config = getAuthHeader();
  config.params = params;
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getDashboard = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, getAuthHeader());
  return response.data;
};

const createDashboard = async (dashboardData) => {
  const response = await axios.post(baseUrl, dashboardData, getAuthHeader());
  return response.data;
};

const updateDashboard = async (id, dashboardData) => {
  const response = await axios.put(
    `${baseUrl}/${id}`,
    dashboardData,
    getAuthHeader()
  );
  return response.data;
};

const deleteDashboard = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getAuthHeader());
  return response.data;
};

// eslint-disable-next-line
export default {
  getDashboards,
  getDashboard,
  createDashboard,
  updateDashboard,
  deleteDashboard,
};
