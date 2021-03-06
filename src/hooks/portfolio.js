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
    .then((r) => r.data);
};

export const getPortfolioDetail = async (pfID) => {
  if (!pfID) {
    throw Error("InputErr : Invalid portfolio ID.");
  }

  return progressClient(true)
    .get("/api/portfolio/all", {
      params: {id: pfID},
    })
    .then((r) => r?.data);
};

export const getSharedPortfoilo = (uuid) => {
  return progressClient(true)
    .get("/api/portfolio/lookup", {
      params: {
        uuid: uuid,
      },
    })
    .then((r) => r?.data);
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
    .then((r) => r.id);
};

export const deletePortfolio = async (pfID) => {
  if (!pfID) {
    throw Error("InputErr : Invalid portfolio ID.");
  }

  return progressClient(true)
    .delete("/api/portfolio", {
      params: {id: pfID},
    })
    .then((r) => r?.id);
};

export const completePortfolio = async (pfInfo) => {
  return progressClient(true)
    .post("/api/portfolio/complete", {
      pfId: pfInfo.pfId,
      pfShare: pfInfo.pfShare,
      pfTemplate: pfInfo.pfTemplate,
    })
    .then((r) => {
      if (r?.status !== "OK") {
        throw Error(`NetErr : Failed to complete portfolio. ${pfInfo?.pfId}`);
      }
    });
};

export const userHasPortfoilo = async (userId, pfId) => {
  if (!isValidId(userId) || !pfId) {
    return false;
  }

  return getPortfolio(userId)
    .then((r) => {
      for (let e of r) {
        if (e?.id === pfId) {
          return true;
        }
      }
      return false;
    })
    .catch((e) => {
      console.error(
        `UserErr : Unauthorized user is approaching portfolio ${pfId}`
      );
      console.error(e);
      return false;
    });
};
