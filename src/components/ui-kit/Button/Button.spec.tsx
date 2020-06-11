import React from "react";
import Button from "./Button";
import { render, fireEvent } from "__utils__/render";

// This test is just an example of using jest-dom matchers
// In real world scenario this test is useless, except being created to fix an existing bug and to prevent regressions
it("should contain passed text", () => {
  const { getByText } = render(<Button>Foo</Button>);
  expect(getByText("Foo")).toBeInTheDocument();
});

it("should fire onClick handler", () => {
  const onClickSpy = jest.fn();
  const { getByText } = render(<Button onClick={onClickSpy}>Foo</Button>);
  fireEvent.click(getByText("Foo"));
  expect(onClickSpy).toBeCalledTimes(1);
});
