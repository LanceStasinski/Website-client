import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

import DrawerNavItem from "./DrawerNavItem";


test("renders a link", () => {
  render(
    <BrowserRouter>
      <Route>
        <DrawerNavItem to="/" exact />
      </Route>
    </BrowserRouter>
  );
  const linkElement = screen.getByRole("link");
  expect(linkElement).toBeInTheDocument();
});
