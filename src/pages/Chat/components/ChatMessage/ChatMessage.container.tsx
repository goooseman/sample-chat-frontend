import React, { PureComponent } from "react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";

interface ChatMessageContainerProps extends ChatMessageProps {
  text: string;
}

const linkRegexp = /(https?:\/\/[\w-\.\/\:\?\=\&]+)/gi;

class ChatMessageContainer extends PureComponent<ChatMessageContainerProps> {
  render(): React.ReactNode {
    return <ChatMessage {...this.props} text={this.getText()} />;
  }

  private getText = (): React.ReactNode => {
    const { text } = this.props;
    // https://stackoverflow.com/a/33238464
    const parts: (string | JSX.Element)[] = text.split(linkRegexp);
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = (
        <a key={"link" + i} href={parts[i] as string}>
          {parts[i]}
        </a>
      );
    }
    return parts;
  };
}

export default ChatMessageContainer;
