import axios from "axios";

export const loadTerm = async () => {
  const instance = axios.create({timeout: 5 * 60 * 1000});

  return await instance
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

  const instance = axios.create({timeout: 5 * 60 * 1000});
  const response = await instance.post(
    `${process.env.REACT_APP_BACKEND}/api/term`,
    data
  );

  if (response.status !== 200) {
    throw Error(`NetErr : Cannot save agreement. : ${response.statusText}`);
  }

  return response.data;
};
