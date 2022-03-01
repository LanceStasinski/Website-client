import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

import BlogList from "./BlogList";

describe("BlogList component", () => {
  test("renders two blog cards", () => {
    const loadedPosts = [
      {
        _id: "1",
        title: "Post 1",
        blurb: "This is the first post.",
        tags: "tag1",
        headImg: "testimg",
        headImgAlt: "testing image",
        month: "December",
        day: 15,
        year: 2021,
      },
      {
        _id: "2",
        title: "Post 2",
        blurb: "This is the second post.",
        tags: "tag2",
        headImg: "testimg",
        headImgAlt: "testing image",
        month: "December",
        day: 15,
        year: 2021,
      },
    ];
    render(
      <BrowserRouter>
        <Route>
          <BlogList posts={loadedPosts} />
        </Route>
      </BrowserRouter>
    );
    const cards = document.getElementsByTagName("a");
    const h2Elements = document.getElementsByTagName("h2");
    const pElements = document.getElementsByTagName("p");
    const timeElements = document.getElementsByTagName("time");
    const tag1 = screen.getByText("tag1");
    const tag2 = screen.getByText("tag2");
    const imageElements = document.getElementsByTagName("img");
    expect(cards.length).toEqual(2);
    expect(h2Elements.length).toEqual(2);
    expect(pElements.length).toEqual(2);
    expect(timeElements.length).toEqual(2);
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    expect(imageElements.length).toEqual(2);
  });
  test('renders "No posts found"', () => {
    const posts = undefined;
    render(<BlogList posts={posts} />);
    const noPosts = screen.getByText(/no posts found/i);
    expect(noPosts).toBeInTheDocument();
  });
});
