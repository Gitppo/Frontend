import {isValidId} from "./useUserContext";
import progressClient from "./client";

export const getPortfolio = async (id) => {
  if (!isValidId(id)) {
    throw Error("InputErr : Invalid user id.");
  }

  return progressClient(true)
    .get("/api/portfolio", {
      params: {id: id},
    })
    .then((r) => {
      if (r.status !== 200 || r.data?.status !== "OK")
        throw Error("NetErr : Failed to load portfolio.");

      return r.data.data;
    })
    .catch((e) => {
      throw e;
    });
};

export const createPortfolio = async (id, pfName) => {
  if (!isValidId(id)) {
    throw Error("InputErr : Invalid user id.");
  }

  return progressClient(true)
    .post("/api/portfolio", {
      pfName: pfName || "기본 포트폴리오",
      pfStar: true,
      usrId: id,
    })
    .then((r) => {
      if (r.status !== 200 || r.data?.message !== "포트폴리오 추가 완료")
        throw Error("NetErr : Failed to create a new portfolio.");

      return r.data.id;
    })
    .catch((e) => {
      throw e;
    });
};

export const deletePortfolio = async (pfID) => {
  if (!pfID) {
    throw Error("InputErr : Invalid portfolio ID.");
  }

  return await progressClient(true)
    .delete("/api/portfolio", {
      params: {id: pfID},
    })
    .then((r) => {
      if (r.status !== 200 || r.data?.message !== "포트폴리오 삭제 완료") {
        throw Error(`NetErr : Failed to delete a portfolio. : id=${pfID}`);
      }
      return r.data?.id;
    })
    .catch((e) => {
      throw e;
    });
};

export const getPortfolioDetail = async (pfID) => {
  if (!pfID) {
    throw Error("InputErr : Invalid portfolio ID.");
  }

  return progressClient(true)
    .get("/api/portfolio/all", {
      params: {id: pfID},
    })
    .then((r) => {
      console.log(r);
      if (r.status !== 200 || r.data?.status !== "OK")
        throw Error("NetErr : Failed to load portfolio's detail.");

      return r.data?.data;
    })
    .catch((e) => {
      throw e;
    });
};
