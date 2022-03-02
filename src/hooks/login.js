import axios from "axios";
import qs from "qs";

export const doLogin = async (path) => {
  const {code} = qs.parse(path, {
    ignoreQueryPrefix: true,
  });

  const instance = axios.create({timeout: 5 * 60 * 1000});
  const {id, githubUserName} = await instance
    .post(`${process.env.REACT_APP_BACKEND}/auth?code=` + code)
    .then((r) => r.data);

  if (typeof id !== "number" || typeof githubUserName !== "string")
    throw Error("NetErr : Github login fail");

  return {id: id, githubUserName: githubUserName};
};
