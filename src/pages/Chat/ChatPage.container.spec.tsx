import React from "react";
import ChatPageContainer from "./ChatPage.container";
import { render } from "__utils__/renderWithRouter";
import { withRouter } from "react-router-dom";

const Container = withRouter(ChatPageContainer);

let originalAlert: (message?: unknown) => void;
beforeEach(() => {
  originalAlert = window.alert;
  Object.defineProperty(window, "alert", {
    value: jest.fn(),
    writable: true,
  });
});

afterEach(() => {
  Object.defineProperty(window, "alert", {
    value: originalAlert,
    writable: true,
  });
});

it("should not redirect to /settings", () => {
  const { history } = render(<Container username="goooseman" />);
  expect(history.location.pathname).toBe("/");
});

it("should redirect to /settings if no username is provided", () => {
  const { history } = render(<Container username={undefined} />);
  expect(history.location.pathname).toBe("/settings");
});

it("should redirect to /settings if username is empty", () => {
  const { history } = render(<Container username="" />);
  expect(history.location.pathname).toBe("/settings");
});

it("should call markAllAdRead when mounted", () => {
  const markAllAsReadSpy = jest.fn();
  render(<Container username="foo" markAllAsRead={markAllAsReadSpy} />);
  expect(markAllAsReadSpy).toBeCalledTimes(1);
});

it("should show error alert if username is empty", () => {
  render(<Container username={undefined} />);
  expect(window.alert).toBeCalledTimes(1);
});
