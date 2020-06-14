import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import ChatPage from "./ChatPage";

interface ChatPageContainerProps extends RouteComponentProps {}

class ChatPageContainer extends PureComponent<ChatPageContainerProps> {
  render(): React.ReactNode {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return <ChatPage chatMessages={[]} onSubmit={() => {}} />;
  }
}

export default ChatPageContainer;
