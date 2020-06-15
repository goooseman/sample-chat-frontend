import React from "react";
import ChatMessageContainer from "./ChatMessage.container";
import { render } from "__utils__/render";

const defaultMessage = {
  text: "Yo!",
  type: "inbox",
  username: "goooseman",
  createdAt: new Date(),
  status: "none",
} as const;

it("should find links automatically", () => {
  const textWithLink = "Find it out on Google: https://google.com!";
  const { getByText } = render(
    <ChatMessageContainer {...defaultMessage} text={textWithLink} />
  );
  expect(getByText("https://google.com")).toHaveAttribute(
    "href",
    "https://google.com"
  );
});

it("should find links with three subdomains automatically", () => {
  const textWithLink = "Find it out on Google: https://docs.google.com!";
  const { getByText } = render(
    <ChatMessageContainer {...defaultMessage} text={textWithLink} />
  );
  expect(getByText("https://docs.google.com")).toHaveAttribute(
    "href",
    "https://docs.google.com"
  );
});

it("should find links with path automatically", () => {
  const textWithLink =
    "Find it out on Google: https://google.com/page?foo=bar&time=am!";
  const { getByText } = render(
    <ChatMessageContainer {...defaultMessage} text={textWithLink} />
  );
  expect(getByText("https://google.com/page?foo=bar&time=am")).toHaveAttribute(
    "href",
    "https://google.com/page?foo=bar&time=am"
  );
});
it("should find links with port number automatically", () => {
  const textWithLink = "Find it out on Google: https://google.com:80!";
  const { getByText } = render(
    <ChatMessageContainer {...defaultMessage} text={textWithLink} />
  );
  expect(getByText("https://google.com:80")).toHaveAttribute(
    "href",
    "https://google.com:80"
  );
});

it("should find links with http proto automatically", () => {
  const textWithLink = "Find it out on Google: http://google.com!";
  const { getByText } = render(
    <ChatMessageContainer {...defaultMessage} text={textWithLink} />
  );
  expect(getByText("http://google.com")).toHaveAttribute(
    "href",
    "http://google.com"
  );
});
