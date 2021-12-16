import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ReferenceFields from "./ReferenceFields";

describe("ReferenceFields component", () => {
  test("renders four input fields", () => {
    render(<ReferenceFields refNumber={1} onRemove={(fieldNumber) => {}} />);
    const inputElements = document.getElementsByTagName("input");
    expect(inputElements.length).toEqual(4);
  });
  test("remove function is called on click", () => {
    const onRemove = jest.fn();
    render(<ReferenceFields refNumber={1} onRemove={onRemove} />);
    const removeBtn = document.getElementsByTagName("button");
    userEvent.click(removeBtn[0]);
    expect(onRemove).toHaveBeenCalled();
  });
  test("render pre-filled form", () => {
    render(
      <ReferenceFields
        refNumber={1}
        onRemove={(fieldNumber) => {}}
        prevRefs={{
          authors: "Lance",
          date: "2020",
          title: "Something",
          url: "someUrl",
          _id: "r1",
        }}
      />
    );
    const authorInput = document.getElementById("authors1") as HTMLInputElement;
    const dateInput = document.getElementById("date1") as HTMLInputElement;
    const titleInput = document.getElementById("title1") as HTMLInputElement;
    const urlInput = document.getElementById("url1") as HTMLInputElement;
    expect(authorInput.value).toBe("Lance");
    expect(dateInput.value).toBe("2020");
    expect(titleInput.value).toBe("Something");
    expect(urlInput.value).toBe("someUrl");
  });
});
