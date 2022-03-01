import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { render, waitFor, screen } from "@testing-library/react";

import { AuthContext } from "../../shared/context/auth-context";
import Blog from "./Blog";
import * as httpHook from "../../shared/hooks/http-hook";

const ADMIN_USER = process.env.REACT_APP_ADMIN_USER;

describe("Blog component", () => {
  test("renders h2, hr, and link", async () => {
    const sendRequest = jest.fn(async () => {});
    jest.spyOn(httpHook, "useHttpClient").mockImplementation(() => {
      return {
        isLoading: false,
        error: undefined,
        clearError: () => {},
        sendRequest: sendRequest,
      };
    });
    render(
      <BrowserRouter>
        <Route>
          <AuthContext.Provider
            value={{
              isLoggedIn: true,
              userId: ADMIN_USER!,
              username: "admin",
              token: "token",
              login: (uid, token, username) => {},
              logout: () => {},
            }}
          >
            <Blog />
          </AuthContext.Provider>
        </Route>
      </BrowserRouter>
    );
    const h1Element = document.getElementsByTagName("h1");
    const hrElement = document.getElementsByTagName("hr");
    const buttonElement = screen.getByText(/add post/i);
    expect(h1Element.length).toEqual(1);
    expect(hrElement.length).toEqual(1);
    expect(buttonElement).toBeInTheDocument();
    await waitFor(() => expect(sendRequest).toHaveBeenCalled());
  });
});
