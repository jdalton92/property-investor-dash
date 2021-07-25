import axios from "axios";
import { getAuthConfig } from "../utils/authHelper";
import { V1_API } from "../constants/constants";
const baseUrl = `${V1_API}/cashflows`;

const getCashflow = async (type, assumptions) => {
  const response = await axios.post(
    `${baseUrl}/`,
    { type, assumptions },
    getAuthConfig()
  );
  return response.data;
};

const getDashboardAndCashflow = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, getAuthConfig());
  return response.data;
};

// eslint-disable-next-line
export default {
  getCashflow,
  getDashboardAndCashflow,
};
