import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("profile");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const updateUser = (data) => {
    setUser(data);
    localStorage.setItem("profile", JSON.stringify(data));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};