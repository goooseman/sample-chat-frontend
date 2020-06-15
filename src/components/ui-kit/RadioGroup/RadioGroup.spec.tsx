import React from "react";
import RadioGroup from "./RadioGroup";
import { render, fireEvent } from "__utils__/render";

const defaultProps = {
  labelledWith: "Foo?",
  id: "story",
  options: [
    {
      value: "foo",
      text: "Foo!",
    },
    {
      value: "bar",
      text: "Bar!",
    },
  ],
  value: "foo",
};

it("should fire onChange after option being clicked", () => {
  const onChangeSpy = jest.fn();
  const { getByLabelText } = render(
    <RadioGroup {...defaultProps} onChange={onChangeSpy} />
  );
  const radioButton = getByLabelText("Bar!");

  fireEvent.click(radioButton);

  expect(onChangeSpy).toBeCalledTimes(1);
  expect(onChangeSpy).toBeCalledWith("bar");
});

it("should work with boolean values", () => {
  const onChangeSpy = jest.fn();
  const { getByLabelText } = render(
    <RadioGroup
      {...defaultProps}
      options={[{ text: "Foo", value: true }]}
      value={false}
      onChange={onChangeSpy}
    />
  );
  const radioButton = getByLabelText("Foo");

  fireEvent.click(radioButton);

  expect(onChangeSpy).toBeCalledTimes(1);
  expect(onChangeSpy).toBeCalledWith(true);
});
