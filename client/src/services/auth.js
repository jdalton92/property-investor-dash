import axios from "axios";
import { getAuthConfig } from "../utils/authHelper";
import { V1_API } from "../config";
const baseUrl = `${V1_API}/auth`;

const initUser = async () => {
  const response = await axios.get(`${baseUrl}/init-user`, getAuthConfig());
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(
    `${baseUrl}/login`,
    { email, password },
    getAuthConfig()
  );
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${baseUrl}/logout`, {}, getAuthConfig());
  return response.data;
};

const demo = async () => {
  const response = await axios.post(`${baseUrl}/demo`, {}, getAuthConfig());
  return response.data;
};

const requestPasswordReset = async (email) => {
  const response = await axios.post(`${baseUrl}/request-password-reset`, {
    email,
  });
  return response.data;
};

const resetPassword = async (id, token, password, checkPassword) => {
  const response = await axios.post(`${baseUrl}/reset-password`, {
    id,
    token,
    password,
    checkPassword,
  });
  return response.data;
};

// eslint-disable-next-line
export default {
  initUser,
  login,
  logout,
  demo,
  requestPasswordReset,
  resetPassword,
};
