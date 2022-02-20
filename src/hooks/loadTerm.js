import axios from "axios";

export const loadTerm = async () => {
  const result = await axios
    .get(`${process.env.REACT_APP_BACKEND}/api/term`)
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        throw Error(`NetErr : Failed to load the terms. : ${r.statusText}`);
      }
    })
    .then((data) => {
      return data.data;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });

  return result;
};

export const saveTermToAgree = async (contract) => {
  let data = [];

  try {
    for (let e of contract) {
      data.push({termID: e.id, termAgreementIsAgree: e?.agree ? true : false});
    }
  } catch {
    throw Error("InputErr : Invalid value");
  }

  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/term`,
    data
  );
  if (response.status !== 200) {
    throw Error(`NetErr : Cannot save agreement. : ${response.statusText}`);
  }
};
