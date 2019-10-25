import React from "react";
import { create } from "react-test-renderer";
import Register from "../Pages/Register.js";

describe("test register component", () => {
  test("for snapshot testing", () => {
    const register = create(<Register />);
    expect(register.toJSON()).toMatchSnapshot();
  });
});
