import axios from 'axios';

import routes from '../routes';

export const getData = async (token) => {
  if (!token) {
    return {};
  }
  const path = routes.dataPath();
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = await axios.get(path, headers);
  return data;
};

export const getToken = async (authParams) => {
  const path = routes.loginPath();
  const response = await axios.post(path, authParams);
  const { data } = await response;
  return data;
};
