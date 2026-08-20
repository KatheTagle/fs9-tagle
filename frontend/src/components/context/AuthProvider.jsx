import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, [location]);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("access_token", accessToken);

    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }

    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};