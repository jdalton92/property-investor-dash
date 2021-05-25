import axios from "axios";
import { getAuthHeader } from "../utils/tokenHelper";
import { V1_API } from "../config";
const baseUrl = `${V1_API}/cashflows`;

const getCashflow = async (type, assumptions) => {
  const response = await axios.post(`${baseUrl}/`, { type, assumptions });
  return response.data;
};

const getDashboardAndCashflow = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, getAuthHeader());
  return response.data;
};

// eslint-disable-next-line
export default {
  getCashflow,
  getDashboardAndCashflow,
};
