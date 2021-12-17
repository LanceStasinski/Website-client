import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { AuthContext } from "../../shared/context/auth-context";
import Post from "./Post";
import * as httpHook from "../../shared/hooks/http-hook";

Enzyme.configure({ adapter: new Adapter() });

describe("Post component", () => {
  const body = global.document.querySelector("body");
  const backdropRoot = global.document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-hook");
  const blogLinksRoot = global.document.createElement("div");
  blogLinksRoot.setAttribute("id", "bloglinks-hook");
  body?.appendChild(backdropRoot);
  body?.appendChild(blogLinksRoot);
  const response = {
    post: {
      _id: "p1",
      __v: 5,
      title: "Test post",
      blurb: "This is a test post",
      month: "December",
      day: "15",
      year: "2021",
      updatedMonth: "December",
      updatedDay: "16",
      updatedYear: "2021",
      content: [
        {
          _id: "c1",
          type: "heading",
          text: "Testing...",
          alt: "",
          language: "",
        },
        {
          _id: "c2",
          type: "paragraph",
          text: "This is a test post.",
          alt: "",
          language: "",
        },
        {
          _id: "c3",
          type: "imageUrl",
          text: "data:image/png;base64,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",
          alt: "test image",
          language: "",
        },
        {
          _id: "c4",
          type: "code",
          text: 'console.log("This is some code")',
          language: "javascript",
          alt: "",
        },
      ],
      references: [
        {
          authors: "tester",
          date: "2020",
          title: "test reference",
          url: "http://test@test.com",
          _id: "r1",
        },
      ],
      comments: [],
    },
    posts: [
      {
        title: "p1",
        _id: "p1",
      },
      {
        title: "p2",
        _id: "p2",
      },
    ],
  };
  test("renders a post", async () => {
    const sendRequest = jest.fn(async () => response);
    jest.spyOn(httpHook, "useHttpClient").mockImplementation(() => {
      return {
        isLoading: false,
        error: undefined,
        clearError: () => {},
        sendRequest: sendRequest,
      };
    });
    const { getByText } = render(
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
            <Post />
          </AuthContext.Provider>
        </Route>
      </BrowserRouter>
    );

    const title = await waitFor(() => getByText("Test post"));
    expect(title).toBeInTheDocument();
    expect(sendRequest).toHaveBeenCalledTimes(1);
  });
  test("renders no post found if no posts are loaded", async () => {
    const sendRequest = jest.fn(async () => {});
    jest.spyOn(httpHook, "useHttpClient").mockImplementation(() => {
      return {
        isLoading: false,
        error: undefined,
        clearError: () => {},
        sendRequest: sendRequest,
      };
    });
    const { getByText } = render(
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
            <Post />
          </AuthContext.Provider>
        </Route>
      </BrowserRouter>
    );

    const title = await waitFor(() => getByText("Post Not Found!"));
    expect(title).toBeInTheDocument();
  });
});
