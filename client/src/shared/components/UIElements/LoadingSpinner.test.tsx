import React from "react";
import { render } from "@testing-library/react";

import LoadingSpinner from "./LoadingSpinner";

test('renders 11 divs', () => {
  render(<LoadingSpinner asOverlay={false}/>)
  const divElements = document.getElementsByTagName('div');
  expect(divElements).toHaveLength(12);
})