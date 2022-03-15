import {isValidId} from "./useUserContext";
import progressClient from "./client";

export const loadTerm = async () => {
  return progressClient(true)
    .get(`${process.env.REACT_APP_BACKEND}/api/term`)
    .then((r) => r.data);
};

export const saveTermToAgree = async (userID, data) => {
  if (!isValidId(userID)) {
    throw Error("InputErr : Invalid user id.");
  }

  return progressClient(true).post(
    `${process.env.REACT_APP_BACKEND}/api/term`,
    data
  );
};
