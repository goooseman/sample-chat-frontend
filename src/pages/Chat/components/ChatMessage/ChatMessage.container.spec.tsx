import React from "react";
import ChatMessageContainer from "./ChatMessage.container";
import { render } from "__utils__/render";
import nock from "nock";

const defaultMessage = {
  text: "Yo!",
  type: "inbox",
  username: "goooseman",
  createdAt: new Date(),
  status: "none",
  onLoad: jest.fn(),
} as const;

jest.setTimeout(10 * 1000);

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

it("should find links in brackets automatically", () => {
  const textWithLink = "Find it out on Google: (https://google.com!)";
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
  const textWithLink = "Find it out on Google: http://google.com:80!";
  const { getByText } = render(
    <ChatMessageContainer {...defaultMessage} text={textWithLink} />
  );
  expect(getByText("http://google.com:80")).toHaveAttribute(
    "href",
    "http://google.com:80"
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

describe("Images", () => {
  afterEach(nock.restore);

  it("should find first image in the text automatically", async () => {
    nock("https://images.unsplash.com")
      .head("/photo-1542692810-396766644d8c")
      .reply(200, {}, { "Content-type": "image/jpeg" });

    const textWithLink =
      "Here is a picture of a beautiful car: https://images.unsplash.com/photo-1542692810-396766644d8c";
    const { findByAltText } = render(
      <ChatMessageContainer {...defaultMessage} text={textWithLink} />
    );
    expect(await findByAltText("Image from the message")).toBeInTheDocument();
    expect(await findByAltText("Image from the message")).toHaveAttribute(
      "src",
      "https://images.unsplash.com/photo-1542692810-396766644d8c"
    );
  });

  it("should follow redirects to find an image", async () => {
    nock("https://source.unsplash.com")
      .get("/600x300?girl")
      .reply(302, undefined, {
        Location: "https://images.unsplash.com/photo-1542692810-396766644d8c",
      });

    nock("https://images.unsplash.com")
      .head("/photo-1542692810-396766644d8c")
      .reply(200, {}, { "Content-type": "image/jpeg" });

    const textWithLink =
      "Here is a picture of a beautiful car: https://source.unsplash.com/600x300?girl";
    const { findByAltText } = render(
      <ChatMessageContainer {...defaultMessage} text={textWithLink} />
    );
    expect(
      await findByAltText("Image from the message", {}, { timeout: 10 * 1000 })
    ).toBeInTheDocument();
    expect(await findByAltText("Image from the message")).toHaveAttribute(
      "src",
      "https://source.unsplash.com/600x300?girl"
    );
  });

  it("should find second image in the text automatically", async () => {
    nock("https://google.com")
      .head("/")
      .reply(200, {}, { "Content-type": "text/html" });
    nock("https://images.unsplash.com")
      .head("/photo-1542692810-396766644d8c")
      .reply(200, {}, { "Content-type": "image/jpeg" });

    const textWithLink =
      "I've searched through google (https://google.com). Here is a picture of a beautiful car: https://images.unsplash.com/photo-1542692810-396766644d8c";
    const { findByAltText } = render(
      <ChatMessageContainer {...defaultMessage} text={textWithLink} />
    );
    expect(
      await findByAltText("Image from the message", {}, { timeout: 10 * 1000 })
    ).toBeInTheDocument();
    expect(await findByAltText("Image from the message")).toHaveAttribute(
      "src",
      "https://images.unsplash.com/photo-1542692810-396766644d8c"
    );
  });
});

describe("Youtube", () => {
  it("should show youtube player for https://www.youtube.com/watch?v=BMUiFMZr7vk", async () => {
    const textWithYoutube =
      "Watch it: https://www.youtube.com/watch?v=BMUiFMZr7vk!";
    const { findByLabelText } = render(
      <ChatMessageContainer {...defaultMessage} text={textWithYoutube} />
    );
    expect(await findByLabelText("Youtube player")).toBeInTheDocument();
  });

  it("should show youtube video for two messages in a row", async () => {
    const textWithYoutube =
      "Watch it: https://www.youtube.com/watch?v=BMUiFMZr7vk!";
    const { findAllByLabelText } = render(
      <>
        <ChatMessageContainer {...defaultMessage} text={textWithYoutube} />
        <ChatMessageContainer {...defaultMessage} text={textWithYoutube} />
      </>
    );
    expect(await findAllByLabelText("Youtube player")).toHaveLength(2);
  });
});
