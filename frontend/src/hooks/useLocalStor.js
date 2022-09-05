//import { useDispatch } from 'react-redux';
//import { setUsername, setToken } from '../slices/loginSlice';

export const saveToken = async (response) => {
  const {data} = response;
 // const dispatch = useDispatch();
  localStorage.setItem('login', JSON.stringify(data));
 // const { username, token } = data;
  //dispatch(setUsername(username));
 // dispatch(setToken(token));
};

export const getLogin = () => {
  const data = localStorage.getItem('login');
  return data === null ? null : JSON.parse(data);
};

export const removeItem = (nameItem) => {
  localStorage.removeItem(nameItem);
};