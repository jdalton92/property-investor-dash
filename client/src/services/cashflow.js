import axios from "axios";
import { getAuthHeader } from "../utils/tokenHelper";
const baseUrl = "/api/cashflow";

const getCashflow = async (type, assumptions) => {
  const response = await axios.post(`${baseUrl}/`, { type, assumptions });
  return response.data;
};

const getDashboardCashflow = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, getAuthHeader());
  return response.data;
};

// eslint-disable-next-line
export default {
  getCashflow,
  getDashboardCashflow,
};
