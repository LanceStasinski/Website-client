import { useState, useCallback, useEffect } from "react";

let logoutTimer: any;

export const useAuth = () => {
  const [token, setToken] = useState('');
  const [tokenExpiration, setTokenExpiration] = useState<Date>();
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  const login = useCallback((uid, token, username, expirationDate) => {
    setUsername(username);
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
        username: username,
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
        storedData.username,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  const logout = useCallback(() => {
    setToken('');
    setTokenExpiration(undefined);
    setUserId('');
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

  return { token, login, logout, userId, username };
};
