import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";

import Button from "./Button";

describe("Button component", () => {
  test("renders a tag", () => {
    render(<Button href="/">A tag button</Button>);
    const aTag = document.getElementsByTagName("a");
    expect(aTag[0]).toBeInTheDocument();
  });
  test("renders react dom link", () => {
    render(
      <BrowserRouter>
        <Route>
          <Button to="/">Link button</Button>
        </Route>
      </BrowserRouter>
    );
    const linkButton = screen.getByText(/link button/i);
    expect(linkButton).toBeInTheDocument();
  });
  test("renders button", () => {
    render(<Button type="submit">Submit button</Button>);
    const button = document.getElementsByTagName("button");
    expect(button[0]).toBeInTheDocument();
  });
});
