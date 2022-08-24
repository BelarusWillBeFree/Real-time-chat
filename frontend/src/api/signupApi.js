import axios from 'axios';

import routes from '../routes';

const signupApi = async (data) => {
  if (!data) {
    return;
  }
  const path = routes.signupPath();
  return await axios.post(path, data);
};

export default signupApi;
