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
        month: "December",
        day: 15,
        year: 2021,
      },
      {
        _id: "2",
        title: "Post 2",
        blurb: "This is the second post.",
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
    expect(cards.length).toEqual(2);
  });
  test('renders "No posts found"', () => {
    const posts = undefined;
    render(<BlogList posts={posts} />)
    const noPosts = screen.getByText(/no posts found/i);
    expect(noPosts).toBeInTheDocument();
  })
});
