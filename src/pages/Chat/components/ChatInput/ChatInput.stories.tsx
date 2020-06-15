import React from "react";
import ChatInput from "./ChatInput";
import { action } from "@storybook/addon-actions";

export default {
  title: "pages/Chat/components/ChatInput",
  component: ChatInput,
};

const handleSubmit = action("onSubmit");

export const withCtrlPlusEnterToSend = (): React.ReactNode => (
  <ChatInput onSubmit={handleSubmit} isCtrlEnterToSend />
);

export const withoutCtrlPlusEnterToSend = (): React.ReactNode => (
  <ChatInput onSubmit={handleSubmit} isCtrlEnterToSend={false} />
);
