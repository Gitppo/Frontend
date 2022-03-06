import qs from "qs";
import progressClient from "./client";

export const doLogin = async (path) => {
  const {code} = qs.parse(path, {
    ignoreQueryPrefix: true,
  });

  return await progressClient(true)
    .post(`/auth?code=${code}`)
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
