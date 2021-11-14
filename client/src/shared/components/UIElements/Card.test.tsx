import React from "react";
import { render, screen } from "@testing-library/react";

import Card from "./Card";

test('renders card', () => {
  render(<Card>This is a card.</Card>)
  const cardText = screen.getByText(/this is a card./i);
  expect(cardText).toBeInTheDocument();
})