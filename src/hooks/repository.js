import axios from "axios";
import {isValidName} from "./useUserContext";

export const getRepository = async (githubUserName) => {
  if (!isValidName(githubUserName))
    throw Error("AccErr : Invalid github user name");

  const instance = axios.create({timeout: 5 * 60 * 1000});
  return instance
    .get(`${process.env.REACT_APP_BACKEND}/api/repository`, {
      params: {
        githubUserName: githubUserName,
      },
    })
    .then((r) => {
      if (r.status !== 200 || r.data.status !== "OK")
        throw Error("NetErr : Failed to load github repos.");

      return r.data.data;
    })
    .catch((e) => {
      throw e;
    });
};
