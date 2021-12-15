import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Comment from "./Comment";
import { AuthContext } from "../../shared/context/auth-context";

describe("Comment component", () => {
  test("render a comment", () => {
    render(
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
        <Comment
          userId="u1"
          commentId="c1"
          userName="tester1"
          date="12/15/2021"
          onDelete={async () => {}}
        >
          This is a comment
        </Comment>
      </AuthContext.Provider>
    );
    const commentElement = screen.getByText(/this is a comment/i);
    expect(commentElement).toBeInTheDocument();
  });
  test("delete functionality", () => {
    const body = global.document.querySelector("body");
    const backdropRoot = global.document.createElement("div");
    backdropRoot.setAttribute("id", "backdrop-hook");
    const modalRoot = global.document.createElement("div");
    modalRoot.setAttribute("id", "modal-hook");
    body?.appendChild(backdropRoot);
    body?.appendChild(modalRoot);

    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: true,
          userId: "u1",
          username: "tester1",
          token: "token",
          login: (uid, token, username) => {},
          logout: () => {},
        }}
      >
        <Comment
          userId="u1"
          commentId="c1"
          userName="tester1"
          date="12/15/2021"
          onDelete={async (id: string) => {}}
        >
          This is a comment
        </Comment>
      </AuthContext.Provider>
    );
    const deleteBtn = screen.getByText(/Delete/);
    expect(deleteBtn).toBeInTheDocument();
    userEvent.click(deleteBtn);
    const confirmModal = screen.getByText(/are you sure/i);
    expect(confirmModal).toBeVisible();
  });
  test('user with different id should not be able to delete comment', () => {
    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: true,
          userId: "u2",
          username: "tester2",
          token: "token",
          login: (uid, token, username) => {},
          logout: () => {},
        }}
      >
        <Comment
          userId="u1"
          commentId="c1"
          userName="tester1"
          date="12/15/2021"
          onDelete={async (id: string) => {}}
        >
          This is a comment
        </Comment>
      </AuthContext.Provider>
    );
    const deleteBtn = document.querySelectorAll('delete-btn');
    expect(deleteBtn[0]).toBeUndefined();
  })
});
