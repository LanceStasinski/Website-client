import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InputFields from "./InputFields";

describe("InputFields component", () => {
  test("renders 1 select, 1 textarea, and 3 input elements", () => {
    render(<InputFields inputNumber={1} onRemove={(fieldNumber) => {}} />);
    const selectElements = document.getElementsByTagName("select");
    const textAreaElements = document.getElementsByTagName("textarea");
    const inputElements = document.getElementsByTagName("input");
    expect(selectElements.length).toEqual(1);
    expect(textAreaElements.length).toEqual(1);
    expect(inputElements.length).toEqual(4);
  });
  test("remove function is called on click", () => {
    const onRemove = jest.fn();
    render(<InputFields inputNumber={1} onRemove={onRemove} />);
    const removeBtn = document.getElementsByTagName("button");
    userEvent.click(removeBtn[0]);
    expect(onRemove).toHaveBeenCalled();
  });
  test("renders form with populated values", () => {
    render(
      <InputFields
        inputNumber={1}
        onRemove={(fieldNumber) => {}}
        prevContent={{
          type: "paragraph",
          text: "test text",
          alt: "alt test",
          language: "javascript",
          _id: "c1",
        }}
      />
    );
    const selectElement = document.getElementById(
      "types1"
    ) as HTMLSelectElement;
    const textareaElement = document.getElementById(
      "text1"
    ) as HTMLTextAreaElement;
    const altInputElement = document.getElementById("alt1") as HTMLInputElement;
    const langInputElement = document.getElementById(
      "language1"
    ) as HTMLInputElement;
    expect(selectElement.value).toBe("paragraph");
    expect(textareaElement.value).toBe("test text");
    expect(altInputElement.value).toBe("alt test");
    expect(langInputElement.value).toBe("javascript");
  });
});
