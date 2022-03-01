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

export function useUserContext() {
  return useContext(Context);
}
