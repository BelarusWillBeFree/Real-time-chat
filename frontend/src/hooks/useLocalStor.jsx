//import { useContext } from 'react';
import axios from 'axios';
//import { useDispatch } from "react-redux";

import routes from "../routes";
//import { setUsername, setToken } from '../slices/loginSlice';
/*
const getToken = async(authParams) => {
  const path = routes.loginPath();
  try {
    return await axios.post(path, authParams);
  } catch(err) {
    throw err;
  }
}
*/
//export default getToken;

//const dispatch = useDispatch();

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