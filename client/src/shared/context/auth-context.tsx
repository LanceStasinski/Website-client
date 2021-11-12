import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: (uid: string, token: string, expirationDate?: Date) => {},
  logout: () => {}
})