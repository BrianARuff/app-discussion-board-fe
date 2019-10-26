import React from "react";
import { create } from "react-test-renderer";
import Register from "../Pages/Register.js";
import ReactDOM from "react-dom";
import { act as domAct } from "react-dom/test-utils";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("test register component", () => {
  test("for snapshot testing", () => {
    const register = create(<Register />);
    expect(register.toJSON()).toMatchSnapshot();
  });

  test("register button default text to be 'Register'", () => {
    ReactDOM.render(<Register />, container);
    const button = container.querySelectorAll("span")[3];
    expect(button.textContent).toBe("Register");
  });

  test("register button text changes to 'Registering' after clicking Register button", () => {
    ReactDOM.render(<Register />, container);
    const registerButton = container.querySelectorAll("span")[3];
    domAct(() => {
      registerButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(registerButton.textContent).toBe("Registering");
  });
});
