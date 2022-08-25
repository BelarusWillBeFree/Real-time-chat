import axios from "axios";

import routes from "../routes";

const signupApi = async (data) => {
  if (!data) {
    return;
  }
  const path = routes.signupPath();
  const resultPost = await axios.post(path, data);
  return resultPost;
};

export default signupApi;
