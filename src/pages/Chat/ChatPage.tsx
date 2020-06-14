import React, { PureComponent } from "react";
import classes from "./ChatPage.css";
import cn from "clsx";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

interface ChatPageProps {
  chatMessages: {
    id: string;
    text: string;
    type: "inbox" | "outbox";
    username: string;
    createdAt: Date;
    status: "none" | "receivedByServer";
  }[];
  onSubmit: (message: string) => void;
}

class ChatPage extends PureComponent<ChatPageProps> {
  public chatRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.scrollChatToBottom();
  }

  public componentDidUpdate(): void {
    const chat = this.chatRef.current;
    if (chat && chat.scrollHeight - chat.scrollTop !== chat.clientHeight) {
      this.scrollChatToBottom();
    }
  }

  render(): React.ReactNode {
    const { chatMessages, onSubmit } = this.props;

    return (
      <main className={cn(classes.container)}>
        <div className={cn(classes.messagesContainer)} ref={this.chatRef}>
          {chatMessages.map((c) => (
            <ChatMessage key={c.id} {...c} />
          ))}
        </div>
        <ChatInput onSubmit={onSubmit} />
      </main>
    );
  }

  private scrollChatToBottom() {
    const chat = this.chatRef.current;
    if (chat) {
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    }
  }
}

export default ChatPage;
