import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [tokenLocal, setTokenLocal] = useState(
    localStorage.getItem("accessToken") ?? null
  );

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setTokenLocal(storedToken);
    }
  }, []);

  const saveTokenAndUser = (newToken, newUser) => {
    setTokenLocal(newToken);
    setUser(newUser);
    localStorage.setItem("accessToken", newToken);
  };

  return (
    <TokenContext.Provider value={{ tokenLocal, user, saveTokenAndUser }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
