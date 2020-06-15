import React from "react";
import ChatMessage from "./ChatMessage";

export default {
  title: "pages/Chat/components/ChatMessage",
  component: ChatMessage,
};

const defaultMessage = {
  text: "Yo!",
  type: "inbox",
  username: "goooseman",
  createdAt: new Date(),
  status: "none",
} as const;

export const withRecievedMessage = (): React.ReactNode => (
  <ChatMessage {...defaultMessage} />
);

export const withALink = (): React.ReactNode => (
  <ChatMessage
    {...defaultMessage}
    text={
      <>
        Hi! How are you doing?{" "}
        <a href="https://example.com">https://example.com</a>
      </>
    }
  />
);

export const withHorizontalImage = (): React.ReactNode => (
  <ChatMessage
    {...defaultMessage}
    text={
      <>
        Hi! How are you doing?{" "}
        <a href="https://source.unsplash.com/600x300?girl">
          https://source.unsplash.com/600x300?girl
        </a>
      </>
    }
    imageSrc="https://source.unsplash.com/600x300?girl"
  />
);

export const withVerticalImage = (): React.ReactNode => (
  <ChatMessage
    {...defaultMessage}
    text={
      <>
        Hi! How are you doing?{" "}
        <a href="https://source.unsplash.com/400x800?girl">
          https://source.unsplash.com/400x800?girl
        </a>
      </>
    }
    imageSrc="https://source.unsplash.com/400x800?girl"
  />
);

export const withSentMessage = (): React.ReactNode => (
  <ChatMessage {...defaultMessage} type="outbox" />
);

export const withSentMessageInStatusRecieved = (): React.ReactNode => (
  <ChatMessage {...defaultMessage} type="outbox" status="receivedByServer" />
);

export const withRecievedMessageInStatusRecieved = (): React.ReactNode => (
  <ChatMessage {...defaultMessage} status="receivedByServer" />
);

const yesterday = new Date(Date.now() - 60 * 60 * 24 * 1000);

export const withRecievedYesterdayMessage = (): React.ReactNode => (
  <ChatMessage {...defaultMessage} createdAt={yesterday} />
);
