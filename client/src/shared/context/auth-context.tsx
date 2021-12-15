import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: '',
  username: '',
  token: '',
  login: (uid: string, token: string, username: string, expirationDate?: Date, ) => {},
  logout: () => {}
})