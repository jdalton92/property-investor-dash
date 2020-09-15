let token = null;

export const getConfig = () => {
  return {
    headers: { Authorization: token },
  };
};

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const destroyToken = () => {
  token = null;
};
