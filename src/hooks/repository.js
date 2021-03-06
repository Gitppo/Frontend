import {isValidName} from "./useUserContext";
import progressClient from "./client";

export const getRepository = async (githubUserName) => {
  if (!isValidName(githubUserName)) {
    throw Error("AccErr : Invalid github user name");
  }

  return progressClient(true)
    .get("/api/repository", {
      params: {
        githubUserName: githubUserName,
      },
    })
    .then((r) => {
      if (r?.status !== "OK") {
        throw Error("NetErr : Failed to load github repos.");
      }
      return r?.data;
    });
};

export const saveRepository = async (data) => {
  return progressClient(true)
    .post("/api/repository", data)
    .then((r) => {
      if (r?.status !== "OK") {
        throw Error("NetErr : Failed to save new repos.");
      }
      return r?.data;
    });
};

export const editRepository = async (data) => {
  return progressClient(true)
    .put("/api/repository", data)
    .then((r) => {
      if (r?.status !== "OK") {
        throw Error("NetErr : Failed to edit repos.");
      }
      return r?.data;
    });
};

export const deleteRepository = async (dataArr) => {
  let result = true;

  for (let repoId of dataArr) {
    try {
      await progressClient(true)
        .delete("/api/repository", {
          params: {
            id: repoId,
          },
        })
        .then((r) => {
          if (r.status !== "OK") {
            throw Error(`NetErr : Failed to delete repo ${repoId}`);
          }
        });
    } catch (e) {
      console.error(e);
      result = false;
    }
  }

  return result;
};
