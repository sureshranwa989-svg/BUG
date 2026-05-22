/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  // Login
  const login = (userData, userToken) => {

    setUser(userData);

    setToken(userToken);

    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout
  const logout = () => {

    setUser(null);

    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);
