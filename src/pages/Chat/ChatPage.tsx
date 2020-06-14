import React, { PureComponent } from "react";
import classes from "./ChatPage.css";
import cn from "clsx";
import ChatMessage from "./components/ChatMessage";

interface ChatPageProps {
  chatMessages: {
    id: string;
    text: string;
    isSent: boolean;
    username: string;
    createdAt: Date;
    status: "none" | "receivedByServer";
  }[];
}

class ChatPage extends PureComponent<ChatPageProps> {
  render(): React.ReactNode {
    const { chatMessages } = this.props;

    return (
      <div className={cn(classes.container)}>
        <div>
          {chatMessages.map((c) => (
            <ChatMessage key={c.id} {...c} />
          ))}
        </div>
      </div>
    );
  }
}

export default ChatPage;
