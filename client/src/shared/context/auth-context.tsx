import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  username: null,
  token: null,
  login: (uid: string, token: string, username: string, expirationDate?: Date, ) => {},
  logout: () => {}
})