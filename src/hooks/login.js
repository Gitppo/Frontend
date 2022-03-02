import axios from "axios";
import qs from "qs";
import {isValidUser} from "./useUserContext";

export const doLogin = async (path) => {
  const {code} = qs.parse(path, {
    ignoreQueryPrefix: true,
  });

  const instance = axios.create({timeout: 5 * 60 * 1000});
  const {id, githubUserName} = await instance
    .post(`${process.env.REACT_APP_BACKEND}/auth?code=` + code)
    .then((r) => r.data);

  const user = {id: id, githubUserName: githubUserName};
  if (!isValidUser(user)) throw Error("NetErr : Github login fail");

  return user;
};

export const loginBack = (back) => {
  if (back.charAt(0) === "/") {
    back = back.substring(1);
  }
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${window.location.origin}/callback/${back}`;
};
