import axios from "axios";

export const getOptions = async () => {
  const instance = axios.create({timeout: 5 * 60 * 1000});
  await instance
    .get("http://3.37.186.122:8080/api/skillList")
    .then((r) => {
      if (r.status !== 200 || r.data?.status !== "OK")
        throw Error("NetErr : Failed to load skillList.");

      return r.data.data;
    })
    .catch((e) => {
      throw e;
    });
};
