import axios from 'axios';

import routes from '../routes';

const fetchData = async (token) => {
  if (!token) {
    return {};
  }
  const path = routes.dataPath();
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const result = await axios.get(path, headers);
  return result;
};

export default fetchData;
