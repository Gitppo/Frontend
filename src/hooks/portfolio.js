import axios from "axios";

export const getPortfolio = async (id) => {
  if (!id) {
    throw Error("InputErr : Invalid user id.");
  }

  axios
    .get(`${process.env.REACT_APP_BACKEND}/api/portfolio`, {
      params: {id: id},
    })
    .then((r) => {
      if (r.status !== 200 || r.data?.status !== "OK")
        throw Error("NetErr : Failed to load portfolio.");
      return r.data.data;
    });
};
