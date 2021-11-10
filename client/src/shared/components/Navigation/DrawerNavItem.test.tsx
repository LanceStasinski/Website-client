import React from "react";
import { render, screen } from "@testing-library/react";
import DrawerNavItem from "./DrawerNavItem";
import { BrowserRouter, Route } from "react-router-dom";

test("renders learn react link", () => {
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
