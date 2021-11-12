import { useState, useCallback, useEffect } from "react";

let logoutTimer: any;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState<Date>();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpiration(tokenExpiration);
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user") as string);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpiration(undefined);
    setUserId(null);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpiration, logout]);

  return { token, login, logout, userId };
};
