import progressClient from "./client";

export const getOptions = async () => {
  return await progressClient(true)
    .get("/api/skillList")
    .then((r) => {
      if (r.status !== 200 || r.data?.status !== "OK")
        throw Error("NetErr : Failed to load skillList.");

      return r.data.data;
    })
    .catch((e) => {
      throw e;
    });
};
