import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

import NavLinks from "./NavLinks";
import { AuthContext } from "../../context/auth-context";

describe("NavLinks component", () => {
  test("renders all links", () => {
    render(
      <BrowserRouter>
        <Route>
          <NavLinks />
        </Route>
      </BrowserRouter>
    );
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
    const login = () => {};

    render(
      <AuthContext.Provider value={{
        isLoggedIn: true,
        login: login,
        logout: logout,
        userId: 'u1',
        token: 'token',
        username: 'user1'
      }}>
        <BrowserRouter>
          <Route>
            <NavLinks />
          </Route>
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const logoutBtn = screen.getByText(/logout/i);
    expect(logoutBtn).toBeInTheDocument();
  });
});
