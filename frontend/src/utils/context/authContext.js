import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  function setData(values) {
    setUserData(values);
  }

  return (
    <UserContext.Provider value={{ userData, setData }}>
      {children}
    </UserContext.Provider>
  );
};
