import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

import PostLinks from "./PostLinks";

describe("PostLinks component", () => {
  test("renders links for each title provided", () => {
    render(
      <BrowserRouter>
        <Route>
          <PostLinks
            posts={[
              { title: "post1", _id: "p1" },
              { title: "post2", _id: "p2" },
              { title: "post3", _id: "p3" },
            ]}
          />
        </Route>
      </BrowserRouter>
    );
    const linkElements = document.getElementsByTagName("a");
    expect(linkElements.length).toEqual(4);
  });
  test("renders link to blog if no other titles provided", () => {
    render(
      <BrowserRouter>
        <Route>
          <PostLinks posts={[]} />
        </Route>
      </BrowserRouter>
    );
    const linkElements = document.getElementsByTagName("a");
    expect(linkElements.length).toEqual(1);
  });
});
