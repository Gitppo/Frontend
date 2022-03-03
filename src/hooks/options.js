import axios from "axios";

export const getOptions = async () => {
  await axios
  .get("http://3.37.186.122:8080/api/skillList")
  .then((r) => {
    const data = r.data;
    console.log(data);
    if (r.status !== 200 || r.data?.status !== "OK")
      throw Error("NetErr : Failed to load skillList.");
    return r.data.data;
  });
};