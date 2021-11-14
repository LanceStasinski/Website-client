import React from "react";
import { render, screen } from "@testing-library/react";

import Modal from "./Modal";

describe("Modal component", () => {
  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "modal-hook");
  const body = global.document.querySelector("body");
  body?.appendChild(modalRoot);

  const backdropRoot = global.document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-hook");
  body?.appendChild(backdropRoot);

  test("renders populated modal", () => {
    const footer = <div>This is a footer</div>;
    render(
      <Modal
        show={true}
        onCancel={() => {}}
        header="This is a header"
        footer={footer}
      >
        This is the content
      </Modal>
    );
    const headerContent = screen.getByText(/this is a footer/i);
    expect(headerContent).toBeInTheDocument();
    const content = screen.getByText(/this is the content/i);
    expect(content).toBeInTheDocument();
    const footerContent = screen.getByText(/this is a footer/i);
    expect(footerContent).toBeInTheDocument();
  });
});
