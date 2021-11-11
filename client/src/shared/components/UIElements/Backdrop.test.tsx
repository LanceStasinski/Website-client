import React from "react";
import { render } from "@testing-library/react";

import Backdrop from "./Backdrop";

describe("Backdrop component", () => {
  const backdropRoot = global.document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-hook");
  const body = global.document.querySelector("body");
  body?.appendChild(backdropRoot);

  test("renders div", () => {
    render(<Backdrop onClick={() => {}} />);
    const divElement = document.getElementsByTagName('div')
    expect(divElement[0]).toBeInTheDocument();
  });
});
