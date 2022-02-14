import axios from "axios";

export const loadTerm = async () => {
  axios
    .get(`${process.env.REACT_APP_BACKEND}/api/term`)
    .then((r) => {
      console.log(r);
      if (r.status === 200) {
        return r.data;
      } else {
        throw Error(`NetErr : Failed to load the terms. : ${r.statusText}`);
      }
    })
    .then((data) => {
      console.log(data);
      return data.data;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
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

  console.log(data);
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/term`,
    data
  );
  if (response.status !== 200) {
    throw Error(`NetErr : Cannot save agreement. : ${response.statusText}`);
  }
};
