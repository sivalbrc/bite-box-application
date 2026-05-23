import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("bitebox_user");
      const token = localStorage.getItem("bitebox_token");

      if (savedUser && token) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to load auth state:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((userData, token) => {
    try {
      localStorage.setItem("bitebox_user", JSON.stringify(userData));
      localStorage.setItem("bitebox_token", token);
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("bitebox_user");
      localStorage.removeItem("bitebox_token");
      localStorage.removeItem("bitebox_cart");
      setUser(null);
      setIsAuthenticated(false);
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      return false;
    }
  }, []);

  const updateUser = useCallback((updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem("bitebox_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Update user failed:", error);
      return false;
    }
  }, [user]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
