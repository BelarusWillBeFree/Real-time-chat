import axios from 'axios';
import routes from "../routes";

const getToken = async(authParams) => {
  const path = routes.loginPath();
  try {
    return await axios.post(path, authParams);
  } catch(err) {
    throw err;
  }
}

export default getToken;