import axios from "axios";
import { getAuthOptions } from "../utils/authHelper";
import { V1_API } from "../config";
const baseUrl = `${V1_API}/cashflows`;

const getCashflow = async (type, assumptions) => {
  const response = await axios.post(`${baseUrl}/`, { type, assumptions });
  return response.data;
};

const getDashboardAndCashflow = async (id) => {
  const options = getAuthOptions();
  const response = await axios.get(`${baseUrl}/${id}`, options);
  return response.data;
};

// eslint-disable-next-line
export default {
  getCashflow,
  getDashboardAndCashflow,
};
