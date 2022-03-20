import progressClient from "./client";

export const savePersonal = async (data) => {
  return progressClient(true)
    .post("/api/personal", data)
    .then((r) => {
      if (r?.status !== "OK")
        throw Error("NetErr : Failed to save personal information.");
      return r.data;
    });
};

export const editPersonal = async (data) => {
  return progressClient(true)
    .put("/api/personal", data)
    .then((r) => {
      if (r?.status !== "OK")
        throw Error("NetErr : Failed to save personal information.");
      return r.data;
    });
};

export const deletePersonal = async (name, id) => {
  return progressClient(true)
    .delete(`/api/personal/${name}`, {
      params: {
        id: id,
      },
    })
    .then((r) => {
      if (r.status !== "OK")
        throw Error(
          `NetErr : Failed to delete personal information : ${name} ${id}`
        );
      return true;
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
};
