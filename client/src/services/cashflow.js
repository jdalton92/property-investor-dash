import axios from "axios";
const baseUrl = "/api/cashflow";

const getSummaryCashflow = async (type, assumptions) => {
  const response = await axios.post(`${baseUrl}/${type}/monthly`, assumptions);
  return response.data;
};

const getMonthlyCashflow = async (type, assumptions, params = {}) => {
  const config = { params };
  const response = await axios.post(
    `${baseUrl}/${type}/monthly`,
    assumptions,
    config
  );
  return response.data;
};

// eslint-disable-next-line
export default {
  getSummaryCashflow,
  getMonthlyCashflow,
};
