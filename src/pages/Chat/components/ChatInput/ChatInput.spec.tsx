import React from "react";
import ChatInput from "./ChatInput";
import { render, fireEvent } from "__utils__/render";

const changeEvent = {
  target: {
    value: "Foooo",
  },
};

it("should fire onSubmit after send button being clicked", () => {
  const onSubmitSpy = jest.fn();
  const { getByLabelText, getByTitle } = render(
    <ChatInput onSubmit={onSubmitSpy} />
  );
  const placeholder = getByLabelText("Message contents");
  fireEvent.change(placeholder, changeEvent);
  const button = getByTitle("Send!");
  fireEvent.click(button);
  expect(onSubmitSpy).toBeCalledTimes(1);
  expect(onSubmitSpy).toBeCalledWith("Foooo");
});
