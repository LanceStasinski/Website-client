import React from "react";
import { render, screen } from "@testing-library/react";

import MainHeader from './MainHeader';


test("renders a link", () => {
  render(<MainHeader>Header</MainHeader>);
  const headerElement = screen.getByText(/header/i);
  expect(headerElement).toBeInTheDocument();
});
