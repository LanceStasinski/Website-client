import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

import CommentSection from "./CommentSection";
import { AuthContext } from "../../shared/context/auth-context";

describe("CommentSection component", () => {
  test(`render a form`, () => {
    render(
      <BrowserRouter>
        <Route>
          <AuthContext.Provider
            value={{
              isLoggedIn: false,
              userId: "",
              username: "",
              token: "",
              login: (uid, token, username) => {},
              logout: () => {},
            }}
          >
            <CommentSection
              postId="1"
              comments={[
                {
                  comment: "Comment1",
                  creatorId: "u10",
                  postId: "p1",
                  username: "u1",
                  __V: 1.0,
                  _id: "c1",
                  date: "12/15/2021",
                },
                {
                  comment: "Comment2",
                  creatorId: "u20",
                  postId: "p1",
                  username: "u2",
                  __V: 1.0,
                  _id: "c2",
                  date: "12/15/2021",
                },
              ]}
              onDeleteComment={async (commentId) => {}}
              onAddComment={async (commentData) => {}}
            />
          </AuthContext.Provider>
        </Route>
      </BrowserRouter>
    );
    const formElement = document.getElementsByTagName("form");
    const listItems = document.getElementsByTagName("li");
    const authLink = screen.getByText(/login/i);
    expect(formElement[0]).toBeInTheDocument();
    expect(listItems.length).toEqual(2);
    expect(authLink).toBeInTheDocument();
  });
  test("render submit button if logged in", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            isLoggedIn: true,
            userId: "u2",
            username: "u2",
            token: "token",
            login: (uid, token, username) => {},
            logout: () => {},
          }}
        >
          <Route>
            <CommentSection
              postId="1"
              comments={[]}
              onDeleteComment={async (commentId) => {}}
              onAddComment={async (commentData) => {}}
            />
          </Route>
        </AuthContext.Provider>
      </BrowserRouter>
    );
    const listItems = document.getElementsByTagName("li");
    const submitBtn = document.getElementsByTagName("button");
    expect(listItems.length).toEqual(0);
    expect(submitBtn[0]).toBeVisible();
  });
});
