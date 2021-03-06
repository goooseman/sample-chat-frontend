import React from "react";
import ChatPageContainer from "./ChatPage.container";
import { render, screen } from "__utils__/renderWithRouter";
import { withRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { fakeTransformedMessage } from "src/services/ChatService/__fixtures__";

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

it("should open search when search icon is clicked", () => {
  render(<Container username="foo" />);
  userEvent.click(screen.getByLabelText("Open search"));
  expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("Close search"));
  expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
});

it("should show loading indicator while searching", () => {
  render(<Container username="foo" />);
  userEvent.click(screen.getByLabelText("Open search"));
  userEvent.type(screen.getByPlaceholderText("Search..."), "foo");
  expect(screen.getByLabelText("Loading")).toBeInTheDocument();
});

const searchMessages = [
  { ...fakeTransformedMessage, text: "One two three", id: "1" },
  { ...fakeTransformedMessage, text: "Three two one", id: "2" },
];
const searchString = "two";
const searchResults = [
  {
    id: "1",
    matches: ["two"],
  },
  {
    id: "2",
    matches: ["two"],
  },
];

it("should show 1 of 2 when search is completed", async () => {
  const searchMessageSpy = jest.fn().mockImplementation(() => {
    return Promise.resolve(searchResults);
  });
  render(
    <Container
      username="foo"
      chatMessages={searchMessages}
      searchMessage={searchMessageSpy}
    />
  );
  userEvent.click(screen.getByLabelText("Open search"));
  userEvent.type(screen.getByPlaceholderText("Search..."), searchString);
  expect(searchMessageSpy).toBeCalled();
  expect(await screen.findByText("1 of 2")).toBeInTheDocument();
  expect(screen.getByLabelText("Previous result")).toBeDisabled();
  userEvent.click(screen.getByLabelText("Next result"));
  expect(await screen.findByText("2 of 2")).toBeInTheDocument();
  expect(screen.getByLabelText("Next result")).toBeDisabled();
});
