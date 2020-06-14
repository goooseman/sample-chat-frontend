import React from "react";
import ChatInput from "./ChatInput";
import { action } from "@storybook/addon-actions";

export default {
  title: "pages/Chat/components/ChatInput",
  component: ChatInput,
};

const handleSubmit = action("onSubmit");

export const withDefaultInput = (): React.ReactNode => (
  <ChatInput onSubmit={handleSubmit} />
);
