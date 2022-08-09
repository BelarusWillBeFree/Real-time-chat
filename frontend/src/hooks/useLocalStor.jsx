import axios from 'axios';

import routes from "../routes";

export const localStorSet = async(authParams) => {
  
  const path = routes.loginPath();
  try {
    const response = await axios.post(path, authParams);
    const { data } = await response;
    localStorage.setItem('login', JSON.stringify(data));
    return data;
  } catch(err) {
    throw err;
  }
};

export const localStorGet = () => {
  const data = localStorage.getItem('login');
  return !data ? null: JSON.parse(data);
};