import { useEffect, useState } from "react";
import * as AuthService from "./../services/auth.service";
import AuthContext from "./AuthContext.js";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const initAuth = async () => {
    try {
      setIsLoading(true);
      const response = await AuthService.getMe();

      setUser(response.data.user);
    } catch (err) {
      console.error("[GetMe]", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await AuthService.logout();
    } catch (err) {
      console.log(`[Logout] ->`, err);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    await initAuth();
  };

  const value = {
    user,
    isLoading,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
