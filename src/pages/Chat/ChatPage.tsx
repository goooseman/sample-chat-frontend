import React, { PureComponent } from "react";
import classes from "./ChatPage.css";
import cn from "clsx";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

interface ChatPageProps {
  chatMessages: {
    id: string;
    text: string;
    isSent: boolean;
    username: string;
    createdAt: Date;
    status: "none" | "receivedByServer";
  }[];
  onSubmit: (message: string) => void;
}

class ChatPage extends PureComponent<ChatPageProps> {
  render(): React.ReactNode {
    const { chatMessages, onSubmit } = this.props;

    return (
      <main className={cn(classes.container)}>
        <div className={cn(classes.messagesContainer)}>
          {chatMessages.map((c) => (
            <ChatMessage key={c.id} {...c} />
          ))}
        </div>
        <ChatInput onSubmit={onSubmit} />
      </main>
    );
  }
}

export default ChatPage;
