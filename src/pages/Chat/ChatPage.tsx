import React, { PureComponent } from "react";
import classes from "./ChatPage.css";
import cn from "clsx";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { ChatMessage as ChatMessageType } from "src/services/ChatService";
import Button from "src/components/ui-kit/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { WithLocale, withLocale } from "react-targem";
import Input from "src/components/ui-kit/Input";
import Loading from "src/components/ui-kit/Loading";

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
  onSearchInput: (event: React.MouseEvent<HTMLInputElement>) => void;
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
      onSearchInput,
    } = this.props;

    return (
      <main className={cn(classes.container)}>
        <div className={cn(classes.searchContainer)}>
          {searchState !== "chat" ? (
            <Input
              id="search"
              onInput={onSearchInput}
              component="input"
              placeholder={t("Search...")}
              addonRight={searchState === "searchLoading" && <Loading />}
            />
          ) : null}
          <Button
            className={cn(classes.searchButton)}
            onClick={onSearchButtonClick}
          >
            <FontAwesomeIcon
              icon={searchState === "chat" ? faSearch : faTimes}
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
