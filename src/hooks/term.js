import {isValidId} from "./useUserContext";
import progressClient from "./client";

export const loadTerm = async () => {
  return await progressClient(true)
    .get(`${process.env.REACT_APP_BACKEND}/api/term`)
    .then((r) => {
      if (r.status === 200) {
        return r.data.data;
      } else {
        throw Error(`NetErr : Failed to load the terms. : ${r.statusText}`);
      }
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

export const saveTermToAgree = async (userID, contract) => {
  let data = [];

  if (!isValidId(userID)) {
    throw Error("InputErr : Invalid user id.");
  }

  try {
    for (let e of contract) {
      data.push({
        termID: e.id,
        termAgreementIsAgree: e?.agree ? true : false,
        userID: userID,
      });
    }
  } catch {
    throw Error("InputErr : Invalid value");
  }

  return await progressClient(true)
    .post(`${process.env.REACT_APP_BACKEND}/api/term`, data)
    .then((r) => {
      if (r.status !== 200) {
        throw Error(`NetErr : Cannot save agreement. : ${r.statusText}`);
      }

      return r.data;
    })
    .catch((e) => {
      throw e;
    });
};
