import axios from "axios";
import {isValidId} from "./useUserContext";

export const getPortfolio = async (id) => {
  if (!isValidId(id)) {
    throw Error("InputErr : Invalid user id.");
  }

  const instance = axios.create({timeout: 5 * 60 * 1000});
  return instance
    .get(`${process.env.REACT_APP_BACKEND}/api/portfolio`, {
      params: {id: id},
    })
    .then((r) => {
      if (r.status !== 200 || r.data?.status !== "OK")
        throw Error("NetErr : Failed to load portfolio.");
      return r.data.data;
    });
};
