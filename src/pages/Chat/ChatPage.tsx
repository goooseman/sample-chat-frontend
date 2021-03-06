import React, { PureComponent } from "react";
import classes from "./ChatPage.css";
import cn from "clsx";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { ChatMessage as ChatMessageType } from "src/services/ChatService";
import Button from "src/components/ui-kit/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { WithLocale, withLocale } from "react-targem";
import Input from "src/components/ui-kit/Input";

export type SearchState =
  | "chat"
  | "search"
  | "searchLoading"
  | "searchFound"
  | "searchNotFound";

interface ChatPageProps extends WithLocale {
  chatMessages: ChatMessageType[];
  onSubmit: (message: string) => void;
  searchState: SearchState;
  onSearchButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
    const {
      chatMessages,
      onSubmit,
      t,
      searchState,
      onSearchButtonClick,
    } = this.props;

    return (
      <main className={cn(classes.container)}>
        <div>
          {searchState !== "chat" ? (
            <Input id="search" component="input" placeholder={t("Search...")} />
          ) : null}

          <Button onClick={onSearchButtonClick}>
            <FontAwesomeIcon
              icon={faSearch}
              title={
                searchState === "chat" ? t("Open search") : t("Close search")
              }
            />
          </Button>
        </div>
        <div className={cn(classes.messagesContainer)} ref={this.chatRef}>
          {chatMessages.map((c) => (
            <ChatMessage onLoad={this.handleImageLoad} key={c.id} {...c} />
          ))}
        </div>
        <ChatInput onSubmit={onSubmit} />
      </main>
    );
  }

  private handleImageLoad = () => {
    const chat = this.chatRef.current;
    if (chat && chat.scrollHeight - chat.scrollTop !== chat.clientHeight) {
      this.scrollChatToBottom();
    }
  };

  private scrollChatToBottom() {
    const chat = this.chatRef.current;
    if (chat) {
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    }
  }
}

export default withLocale(ChatPage);
