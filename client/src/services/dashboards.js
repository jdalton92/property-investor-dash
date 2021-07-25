import axios from "axios";
import { getAuthConfig } from "../utils/authHelper";
import { V1_API } from "../constants/constants";
const baseUrl = `${V1_API}/dashboards`;

const getDashboards = async (params = {}) => {
  const config = getAuthConfig();
  config.params = params;
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getDashboard = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, getAuthConfig());
  return response.data;
};

const createDashboard = async (dashboardData) => {
  const response = await axios.post(
    baseUrl,
    dashboardData,
    {},
    getAuthConfig()
  );
  return response.data;
};

const updateDashboard = async (id, dashboardData) => {
  const response = await axios.put(
    `${baseUrl}/${id}`,
    dashboardData,
    getAuthConfig()
  );
  return response.data;
};

const deleteDashboard = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getAuthConfig());
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
