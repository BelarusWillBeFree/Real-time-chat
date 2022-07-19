import axios from 'axios';
import routes from "../routes";

const fetchData = async() => {
  const token = localStorage.getItem('token');
  const path = routes.dataPath();
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    return await axios.get(path, headers);
  } catch(err) {
    throw err;
  }
}

export default fetchData;