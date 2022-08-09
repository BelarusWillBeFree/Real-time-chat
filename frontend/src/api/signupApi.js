import axios from 'axios';

import routes from "../routes";

const signupApi = async(data) => {
  if (!data) {
    return;
  }
  const path = routes.signupPath();
  try {
    return await axios.post(path, data);
  } catch(err) {
    throw err;
  }
}

export default signupApi;