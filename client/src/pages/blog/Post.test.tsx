import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { render, waitFor, screen, act } from "@testing-library/react";

import { AuthContext } from "../../shared/context/auth-context";
import Post from "./Post";
import * as httpHook from "../../shared/hooks/http-hook";

describe("Post component", () => {
  const body = global.document.querySelector("body");
  const backdropRoot = global.document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-hook");
  const blogLinksRoot = global.document.createElement("div");
  blogLinksRoot.setAttribute("id", "bloglinks-hook");
  body?.appendChild(backdropRoot);
  body?.appendChild(blogLinksRoot);

  // test("renders a post", async () => {
  //   const response = {
  //     post: {
  //       _id: "p1",
  //       __v: 5,
  //       title: "Test post",
  //       blurb: "This is a test post",
  //       tags: "tags",
  //       headImg: "image",
  //       headImgCaption: "caption",
  //       headImgAlt: "alt",
  //       month: "December",
  //       day: "15",
  //       year: "2021",
  //       updatedMonth: "December",
  //       updatedDay: "16",
  //       updatedYear: "2021",
  //       content: [
  //         {
  //           _id: "c1",
  //           type: "heading",
  //           text: "Testing...",
  //           alt: "",
  //           language: "",
  //           caption: "",
  //         },
  //         {
  //           _id: "c2",
  //           type: "paragraph",
  //           text: "This is a test post.",
  //           alt: "",
  //           language: "",
  //           caption: "",
  //         },
  //         {
  //           _id: "c3",
  //           type: "imageUrl",
  //           text: "test",
  //           alt: "test image",
  //           language: "",
  //           caption: "test caption",
  //         },
  //         {
  //           _id: "c4",
  //           type: "code",
  //           text: 'console.log("This is some code")',
  //           language: "javascript",
  //           alt: "",
  //           caption: "",
  //         },
  //       ],
  //       references: [
  //         {
  //           authors: "tester",
  //           date: "2020",
  //           title: "test reference",
  //           url: "http://test@test.com",
  //           _id: "r1",
  //         },
  //       ],
  //       comments: [],
  //     },
  //     posts: [
  //       {
  //         title: "p1",
  //         _id: "p1",
  //       },
  //       {
  //         title: "p2",
  //         _id: "p2",
  //       },
  //     ],
  //   };
  //   jest.mock("React", () => ({
  //     ...jest.requireActual("React"),
  //     useEffect: jest.fn(),
  //   }));
  //   const sendRequest = jest.fn(async () => Promise.resolve(response));
  //   jest.spyOn(httpHook, "useHttpClient").mockImplementation(() => {
  //     return {
  //       isLoading: false,
  //       error: undefined,
  //       clearError: () => {},
  //       sendRequest: sendRequest,
  //     };
  //   });
  //   // jest.spyOn(React, "useEffect").mockImplementation((f) => f());
  //   expect.assertions(1)
  //   let component: any;
  //   act(() => {
  //     component = render(
  //       <BrowserRouter>
  //         <Route>
  //           <AuthContext.Provider
  //             value={{
  //               isLoggedIn: false,
  //               userId: "",
  //               username: "",
  //               token: "",
  //               login: (uid, token, username) => {},
  //               logout: () => {},
  //             }}
  //           >
  //             <Post />
  //           </AuthContext.Provider>
  //         </Route>
  //       </BrowserRouter>
  //     );
  //   });

  //   const element = component.getByTestId("title");
  //   await waitFor(() => expect(element).toBeInTheDocument());
    // expect(sendRequest).toHaveBeenCalled();
    // expect(screen.getByText("Test post")).toBeInTheDocument();
  // });
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
