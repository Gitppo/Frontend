import qs from "qs";
import progressClient from "./client";

export const doLogin = async (path) => {
  const {code} = qs.parse(path, {
    ignoreQueryPrefix: true,
  });

  return await progressClient(true)
    .post(`/auth?code=${code}`)
    .catch((e) => {
      throw e;
    });
};

export const loginBack = (back = "") => {
  if (back.charAt(0) === "/") {
    back = back.substring(1);
  }
  console.log(
    `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=https://gitppo.github.io/Frontend/callback/${back}`
  );

  window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=https://gitppo.github.io/Frontend/callback/${back}`;
};
