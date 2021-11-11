import React from "react";
import { screen, render } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

import MainNavigation from "./MainNavigation";
import userEvent from "@testing-library/user-event";

describe("MainNavigation component", () => {
  const drawerRoot = global.document.createElement("div");
  drawerRoot.setAttribute("id", "drawer-hook");
  const body = global.document.querySelector("body");
  body?.appendChild(drawerRoot);

  const backdropRoot = global.document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-hook");
  body?.appendChild(backdropRoot);

  test("renders nav, button, and title", () => {
    render(
      <BrowserRouter>
        <Route>
          <MainNavigation />
        </Route>
      </BrowserRouter>
    );
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    const h1Element = screen.getByText(/lance stasinski/i);
    expect(h1Element).toBeInTheDocument();
  });

  test('renders sidedrawer when clicked', () => {
    render(<BrowserRouter>
      <Route>
        <MainNavigation />
      </Route>
    </BrowserRouter>)

    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    const asideElement = document.getElementsByTagName('aside');
    expect(asideElement[0]).toBeVisible()
  })
});
