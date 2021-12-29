import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import DrawerNavLinks from "./DrawerNavLinks";

describe("DrawerNavLinks component", () => {
  test("renders all links", () => {
    render(<BrowserRouter><Route><DrawerNavLinks /></Route></BrowserRouter>);
    const CVLink = screen.getByText(/resume/i);
    expect(CVLink).toBeInTheDocument();
    const portfolioLink = screen.getByText(/portfolio/i);
    expect(portfolioLink).toBeInTheDocument();
    const blogLink = screen.getByText(/blog/i);
    expect(blogLink).toBeInTheDocument();
    const contactLink = screen.getByText(/contact/i);
    expect(contactLink).toBeInTheDocument();
    const loginLink = screen.getByText(/login/i);
    expect(loginLink).toBeInTheDocument();
  });

  test("renders logout button", () => {
    const logout = () => {};
    const login = (uid: string, token: string, username: string) => {};

    render(
      <AuthContext.Provider value={{
        isLoggedIn: true,
        login: login,
        logout: logout,
        userId: '',
        token: '',
        username: ''
      }}>
        <BrowserRouter>
          <Route>
            <DrawerNavLinks />
          </Route>
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const logoutBtn = screen.getByText(/logout/i);
    expect(logoutBtn).toBeInTheDocument();
  });
});
