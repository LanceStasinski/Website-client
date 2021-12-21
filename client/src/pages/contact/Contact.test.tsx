import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Contact from "./Contact";
import userEvent from "@testing-library/user-event";
import * as httpHook from "../../shared/hooks/http-hook";

describe("Contact component", () => {
  const body = global.document.querySelector("body");
  const backdropRoot = global.document.createElement("div");
  const modalRoot = global.document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-hook");
  modalRoot.setAttribute("id", "modal-hook");
  body?.appendChild(backdropRoot);
  body?.appendChild(modalRoot);
  const response = { message: "Message recieved" };
  test("renders form when header is clicked", () => {
    render(<Contact />);
    let formElements = document.getElementsByTagName('form');
    expect(formElements.length).toEqual(0);
    const headerElement = screen.getByText(/send a message/i);
    userEvent.click(headerElement)
    formElements = document.getElementsByTagName('form');
    expect(formElements.length).toEqual(1);
  });
  test("renders 3 inputs, 2 links, and a textarea", () => {
    render(<Contact />);
    const headerElement = screen.getByText(/send a message/i);
    userEvent.click(headerElement)
    const inputElements = document.getElementsByTagName("input");
    const textareaElements = document.getElementsByTagName("textarea");
    const linkElements = document.getElementsByTagName('a');
    expect(inputElements.length).toEqual(3);
    expect(textareaElements.length).toEqual(1);
    expect(linkElements.length).toEqual(2);
  });
  test("should send POST request, show modal, and reset form onSubmit", async () => {
    const sendRequest = jest.fn(async () => {
      return Promise.resolve(response);
    });
    jest.spyOn(httpHook, "useHttpClient").mockImplementation(() => {
      return {
        isLoading: false,
        error: undefined,
        clearError: () => {},
        sendRequest: sendRequest,
      };
    });
    render(<Contact />);
    const headerElement = screen.getByText(/send a message/i);
    userEvent.click(headerElement)
    fireEvent.input(screen.getByRole("textbox", { name: /first name/i }), {
      target: { value: "Test first name" },
    });
    fireEvent.input(screen.getByRole("textbox", { name: /last name/i }), {
      target: { value: "Test last name" },
    });
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "Test email" },
    });
    fireEvent.input(screen.getByRole("textbox", { name: /message/i }), {
      target: { value: "Test message" },
    });
    const submitBtn = screen.getByText("SEND");
    fireEvent.submit(submitBtn);
    await waitFor(() => expect(sendRequest).toHaveBeenCalled());
    const modalOk = screen.getByText("OK");
    expect(modalOk).toBeVisible();
    userEvent.click(modalOk);
    await waitFor(() => expect(modalOk).not.toBeVisible());
    const firstNameElement = screen.getByRole("textbox", {
      name: /first name/i,
    }) as HTMLInputElement;
    const lastNameElement = screen.getByRole("textbox", {
      name: /last name/i,
    }) as HTMLInputElement;
    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const messageElement = screen.getByRole("textbox", {
      name: /message/i,
    }) as HTMLTextAreaElement;
    expect(firstNameElement.value).toBe("");
    expect(lastNameElement.value).toBe("");
    expect(emailElement.value).toBe("");
    expect(messageElement.value).toBe("");
  });
  test('should not allow submission if form is invalid', () => {
    const sendRequest = jest.fn(async () => {
      return Promise.resolve(response);
    });
    jest.spyOn(httpHook, "useHttpClient").mockImplementation(() => {
      return {
        isLoading: false,
        error: undefined,
        clearError: () => {},
        sendRequest: sendRequest,
      };
    });
    render(<Contact />);
    const headerElement = screen.getByText(/send a message/i);
    userEvent.click(headerElement)
    const submitBtn = screen.getByText('SEND');
    userEvent.click(submitBtn);
    expect(sendRequest).not.toHaveBeenCalled();
  })
});
