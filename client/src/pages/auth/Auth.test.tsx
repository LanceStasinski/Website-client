import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Auth from "./Auth";

describe("Auth component", () => {
  test("renders two inputs, two buttons, and two labels", () => {
    render(<Auth />);
    const inputElements = document.getElementsByTagName("input");
    const btnElements = document.getElementsByTagName("button");
    const labelElements = document.getElementsByTagName('label');
    expect(inputElements.length).toEqual(2);
    expect(btnElements.length).toEqual(2);
    expect(labelElements.length).toEqual(2);
  });

  test('renders confirm password field when signing up', () => {
    render(<Auth />);
    const signUpBtn = screen.getByText(/signup/i);
    userEvent.click(signUpBtn);
    const confirmPassword = screen.getByText(/confirm password/i);
    const inputElements = document.getElementsByTagName('input');
    expect(confirmPassword).toBeInTheDocument();
    expect(inputElements.length).toEqual(3);
  })
});
