import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  function setData(values) {
    setUserData(values);
  }

  return (
    <UserContext.Provider
      children={{ ...children }}
      value={{ userData, setData }}
    />
  );
};
