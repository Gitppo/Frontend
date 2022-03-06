import {isValidName} from "./useUserContext";
import progressClient from "./client";

export const getRepository = async (githubUserName) => {
  if (!isValidName(githubUserName))
    throw Error("AccErr : Invalid github user name");

  return await progressClient(true)
    .get("/api/repository", {
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

export const saveRepository = async (data) => {
  console.log(data);

  return await progressClient(true)
    .post("/api/repository", data)
    .then((r) => {
      console.log(r);

      if (r.status !== 200 || r.data.status !== "OK")
        throw Error("NetErr : Failed to save new repos.");

      return r.data.data;
    })
    .catch((e) => {
      throw e;
    });
};
