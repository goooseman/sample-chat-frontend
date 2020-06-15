import React from "react";
import ChatInput, { ChatInputPureProps } from "./ChatInput";
import { withSettings, WithSettings } from "src/contexts/SettingsContext";

interface ContainerProps extends WithSettings, ChatInputPureProps {}

export default withSettings((props: ContainerProps) => (
  <ChatInput
    isCtrlEnterToSend={props.isCtrlEnterToSend}
    onSubmit={props.onSubmit}
  />
));
