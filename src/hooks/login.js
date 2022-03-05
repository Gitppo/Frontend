import axios from "axios";
import qs from "qs";

export const doLogin = async (path) => {
  const {code} = qs.parse(path, {
    ignoreQueryPrefix: true,
  });

  const instance = axios.create({timeout: 5 * 60 * 1000});
  return await instance
    .post(`${process.env.REACT_APP_BACKEND}/auth?code=` + code)
    .then((r) => {
      if (r.status !== 200) {
        throw Error("NetErr : Github login fail");
      }
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
};

export const loginBack = (back = "") => {
  if (back.charAt(0) === "/") {
    back = back.substring(1);
  }
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${window.location.origin}/callback/${back}`;
};
