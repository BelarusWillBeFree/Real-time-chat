import axios from 'axios';

import routes from "../routes";

const fetchData = async(token) => {
  if (!token) {
    return;
  }
  const path = routes.dataPath();
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return await axios.get(path, headers);
}

export default fetchData;