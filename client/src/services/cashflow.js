import axios from "axios";
const baseUrl = "/api/cashflow";

const getCashflow = async (type, assumptions) => {
  const response = await axios.post(`${baseUrl}/`, { type, assumptions });
  return response.data;
};

// eslint-disable-next-line
export default {
  getCashflow,
};
