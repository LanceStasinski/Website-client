import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

import DrawerNavLinks from "./DrawerNavLinks";

describe("DrawerNavLink component", () => {
  test("renders cv link", () => {
    render(<BrowserRouter><Route><DrawerNavLinks /></Route></BrowserRouter>);
    const CVLink = screen.getByText(/cv/i);
    expect(CVLink).toBeInTheDocument();
  });
  test("renders portfolio link", () => {
    render(<BrowserRouter><Route><DrawerNavLinks /></Route></BrowserRouter>);
    const CVLink = screen.getByText(/portfolio/i);
    expect(CVLink).toBeInTheDocument();
  });
  test("renders blog link", () => {
    render(<BrowserRouter><Route><DrawerNavLinks /></Route></BrowserRouter>);
    const CVLink = screen.getByText(/blog/i);
    expect(CVLink).toBeInTheDocument();
  });
  test("renders contact link", () => {
    render(<BrowserRouter><Route><DrawerNavLinks /></Route></BrowserRouter>);
    const CVLink = screen.getByText(/contact/i);
    expect(CVLink).toBeInTheDocument();
  });
});
