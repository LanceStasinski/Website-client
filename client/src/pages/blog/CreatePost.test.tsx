import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreatePost from "./CreatePost";
import { PostContext } from "../../shared/context/post-context";

describe("CreatePost component", () => {
  const useHttpClient = jest.fn();
  const sendRequest = jest.fn();
  sendRequest.mockReturnValue({ message: "Post created." });
  const returnValue = {
    isLoading: false,
    error: undefined,
    sendRequest,
    clearError: () => {},
  };
  useHttpClient.mockReturnValue(returnValue);
  test("renders 8 input, 2 textarea, and 1 select element", () => {
    render(
      <PostContext.Provider
        value={{
          post: undefined,
          setContext: () => {},
          clearContext: () => {},
        }}
      >
        <CreatePost />
      </PostContext.Provider>
    );
    const inputElements = document.getElementsByTagName("input");
    const selectElements = document.getElementsByTagName("select");
    const textareaElements = document.getElementsByTagName("textarea");
    expect(inputElements.length).toEqual(13);
    expect(selectElements.length).toEqual(1);
    expect(textareaElements.length).toEqual(2);
  });
  test("add buttons add input elements to page", () => {
    render(
      <PostContext.Provider
        value={{
          post: undefined,
          setContext: () => {},
          clearContext: () => {},
        }}
      >
        <CreatePost />
      </PostContext.Provider>
    );
    const addContentBtn = screen.getByText(/add content/i);
    const addReferenceBtn = screen.getByText(/add reference/i);
    userEvent.click(addContentBtn);
    let inputElements = document.getElementsByTagName("input");
    expect(inputElements.length).toEqual(17);
    userEvent.click(addReferenceBtn);
    inputElements = document.getElementsByTagName("input");
    expect(inputElements.length).toEqual(21);
  });
  test("remove buttons remove input elements from page", () => {
    render(
      <PostContext.Provider
        value={{
          post: undefined,
          setContext: () => {},
          clearContext: () => {},
        }}
      >
        <CreatePost />
      </PostContext.Provider>
    );
    const removeContentBtn = document.getElementById(
      "removeContent1"
    ) as HTMLButtonElement;
    const removeRefBtn = document.getElementById(
      "removeRef1"
    ) as HTMLButtonElement;
    userEvent.click(removeContentBtn);
    let inputElements = document.getElementsByTagName("input");
    expect(inputElements.length).toEqual(9);
    userEvent.click(removeRefBtn);
    inputElements = document.getElementsByTagName("input");
    expect(inputElements.length).toEqual(5);
  });
  test("renders populated post header input fields", () => {
    render(
      <PostContext.Provider
        value={{
          post: {
            id: "p1",
            title: "Post 1",
            blurb: "This is post 1",
            tags: "testTag",
            headImg: "testImg",
            headImgAlt: "image for testing",
            headImgCaption: "test caption",
            content: [
              {
                _id: "c1",
                type: "paragraph",
              },
            ],
            references: [
              {
                _id: "r1",
                authors: "tester",
                date: "2021",
                url: "someUrl",
                title: "ref1",
              },
            ],
          },
          setContext: () => {},
          clearContext: () => {},
        }}
      >
        <CreatePost />
      </PostContext.Provider>
    );
    const titleElement = document.getElementById("title") as HTMLInputElement;
    const blogElement = document.getElementById("blurb") as HTMLTextAreaElement;
    const tagsElement = document.getElementById("tags") as HTMLInputElement;
    const headImgField = document.getElementById("headImg") as HTMLInputElement;
    const altField = document.getElementById("headImgAlt") as HTMLInputElement;
    const captionField = document.getElementById(
      "headImgCaption"
    ) as HTMLInputElement;
    expect(titleElement.value).toBe("Post 1");
    expect(blogElement.value).toBe("This is post 1");
    expect(tagsElement.value).toBe("testTag");
    expect(headImgField.value).toBe("testImg");
    expect(altField.value).toBe("image for testing");
    expect(captionField.value).toBe("test caption");
  });
});
