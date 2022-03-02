import React, {createContext, useState, useContext} from "react";

const Context = createContext();

export default function UserContextProvider({children}) {
  const [user, setUser] = useState({
    id: -1,
    githubUserName: null,
  });

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useUserContext = () => {
  return useContext(Context);
};

export const isValidUser = (user) => {
  if (typeof user !== "object") return false;

  if (!user?.hasOwnProperty("id")) return false;
  if (typeof user.id !== "number") return false;
  if (user.id <= 0) return false;

  if (!user?.hasOwnProperty("githubUserName")) return false;
  if (typeof user.githubUserName !== "string") return false;
  if (user.githubUserName.length <= 0) return false;

  return true;
};

export const isValidId = (id) => {
  if (!id) return false;
  if (typeof id !== "number") return false;
  if (id <= 0) return false;

  return true;
};

export const isValidName = (name) => {
  if (!name) return false;
  if (typeof name !== "string") return false;
  if (name.length <= 0) return false;

  return true;
};
