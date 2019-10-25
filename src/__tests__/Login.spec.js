import React from "react";
import { create } from "react-test-renderer";
import Login from "../Pages/Login";

describe("test Login component", () => {
  test("Login snapshot from json", () => {
    const login = create(<Login />);
    expect(login.toJSON()).toMatchSnapshot();
  });
});
