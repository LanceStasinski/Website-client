import React from "react";
import { render, screen } from "@testing-library/react";

import ErrorModal from "./ErrorModal";

describe("ErrorModal component", () => {
  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "modal-hook");
  const body = global.document.querySelector("body");
  body?.appendChild(modalRoot);

  const backdropRoot = global.document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-hook");
  body?.appendChild(backdropRoot);

  test("renders an error message", () => {
    render(<ErrorModal error="This is an error." onClear={() => {}} />);
    const errorMessage = screen.getByText(/this is an error/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
