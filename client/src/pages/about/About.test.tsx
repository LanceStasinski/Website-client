import React from "react";
import { render } from "@testing-library/react";

import About from "./About";

describe("About component", () => {
  test("renders 2 images, 1 h1, 2 p, and 3 li elements", () => {
    render(<About />);
    const headShot = document.getElementsByTagName("img");
    const background = document.querySelectorAll(
      'div[class^="background-image"]'
    );
    const h1Elements = document.getElementsByTagName("h1");
    const pElements = document.getElementsByTagName("p");
    const liElements = document.getElementsByTagName("li");
    expect(headShot[0]).toBeInTheDocument();
    expect(background[0]).toBeInTheDocument();
    expect(h1Elements.length).toEqual(1);
    expect(pElements.length).toEqual(2);
    expect(liElements.length).toEqual(3);
  });
});
