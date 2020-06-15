import React from "react";
import ChatPageContainer from "./ChatPage.container";
import { render } from "__utils__/renderWithRouter";
import { withRouter } from "react-router-dom";

const Container = withRouter(ChatPageContainer);

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
