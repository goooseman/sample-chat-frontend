import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import ChatPage from "./ChatPage";

interface ChatPageContainerProps extends RouteComponentProps {}

class ChatPageContainer extends PureComponent<ChatPageContainerProps> {
  render(): React.ReactNode {
    return <ChatPage chatMessages={[]} />;
  }
}

export default ChatPageContainer;
