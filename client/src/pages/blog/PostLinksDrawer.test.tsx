import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

import PostLinksDrawer from "./PostLinksDrawer";
import userEvent from "@testing-library/user-event";

describe("PostLinksDrawer component", () => {
  const body = global.document.querySelector("body");
  const backdropRoot = global.document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-hook");
  const blogLinksRoot = global.document.createElement("div");
  blogLinksRoot.setAttribute("id", "bloglinks-hook");
  body?.appendChild(backdropRoot);
  body?.appendChild(blogLinksRoot);

  test("renders PostLinksDrawer", () => {
    render(
      <BrowserRouter>
        <Route>
          <PostLinksDrawer
            show={true}
            onHoverAway={() => {}}
            onClick={() => {}}
          >
            Some post links.
          </PostLinksDrawer>
        </Route>
      </BrowserRouter>
    );
    const children = screen.getByText(/some post links/i);
    const asideElement = document.getElementsByTagName('aside');
    expect(children).toBeInTheDocument();
    expect(asideElement[0]).toBeInTheDocument();
  });
  test('calls onHoverAway function on mouse leave', () => {
    const onHoverAway = jest.fn();
    render(
      <BrowserRouter>
        <Route>
          <PostLinksDrawer
            show={true}
            onHoverAway={onHoverAway}
            onClick={() => {}}
          >
            Some post links.
          </PostLinksDrawer>
        </Route>
      </BrowserRouter>
    );
    const asideElement = document.getElementsByTagName('aside');
    userEvent.unhover(asideElement[0])
    expect(onHoverAway).toHaveBeenCalled();
  })
});
