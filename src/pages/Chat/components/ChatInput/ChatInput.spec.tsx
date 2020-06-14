import React from "react";
import ChatInput from "./ChatInput";
import { render, fireEvent } from "__utils__/render";

const changeEvent = {
  target: {
    value: "Foooo",
  },
};

const ctrlEnterEvent = {
  ctrlKey: true,
  keyCode: 13,
};

it("should fire onSubmit after send button being clicked", () => {
  const onSubmitSpy = jest.fn();
  const { getByLabelText, getByTitle } = render(
    <ChatInput isCtrlEnterToSend={false} onSubmit={onSubmitSpy} />
  );
  const placeholder = getByLabelText("Message contents");
  fireEvent.change(placeholder, changeEvent);
  const button = getByTitle("Send!");
  fireEvent.click(button);
  expect(onSubmitSpy).toBeCalledTimes(1);
  expect(onSubmitSpy).toBeCalledWith("Foooo");
});

it("should fire onSubmit after CTRL + ENTER being pressed", async () => {
  const onSubmitSpy = jest.fn();
  const { getByLabelText } = render(
    <ChatInput isCtrlEnterToSend onSubmit={onSubmitSpy} />
  );
  const placeholder = getByLabelText("Message contents");
  fireEvent.change(placeholder, changeEvent);

  fireEvent.keyPress(document, ctrlEnterEvent);
  expect(onSubmitSpy).toBeCalledTimes(1);
  expect(onSubmitSpy).toBeCalledWith("Foooo");
});

/**
 * There was a bug in Chrome, https://bugs.chromium.org/p/chromium/issues/detail?id=79407
 */
it("should fire onSubmit after CTRL + ENTER being pressed (old chrome)", async () => {
  const onSubmitSpy = jest.fn();
  const { getByLabelText } = render(
    <ChatInput isCtrlEnterToSend onSubmit={onSubmitSpy} />
  );
  const placeholder = getByLabelText("Message contents");
  fireEvent.change(placeholder, changeEvent);

  fireEvent.keyPress(document, {
    ...ctrlEnterEvent,
    keyCode: 10,
  });
  expect(onSubmitSpy).toBeCalledTimes(1);
  expect(onSubmitSpy).toBeCalledWith("Foooo");
});
