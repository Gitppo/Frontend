import progressClient from "./client";

export const DEFAULT_SKILL_LIST = [
  "C",
  "C++",
  "JavaScript",
  "CSS",
  "React",
  "Firebase",
];

export const getOptions = async () => {
  return await progressClient(true)
    .get("/api/skillList")
    .then((r) => {
      if (r.status !== 200 || r.data?.status !== "OK")
        throw Error("NetErr : Failed to load skillList.");
      if (!(r.data.data?.length > 0)) {
        throw Error("DataErr : No skillList.");
      }

      return r.data.data;
    })
    .catch((e) => {
      throw e;
    });
};
