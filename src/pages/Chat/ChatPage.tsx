import React, { PureComponent } from "react";
import classes from "./ChatPage.css";
import cn from "clsx";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import {
  ChatMessage as ChatMessageType,
  SearchResult,
} from "src/services/ChatService";
import Button from "src/components/ui-kit/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faChevronDown,
  faChevronUp,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { WithLocale, withLocale, T } from "react-targem";
import Input from "src/components/ui-kit/Input";
import Loading from "src/components/ui-kit/Loading";
import Typography from "src/components/ui-kit/Typography";

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
  searchQuery: string;
  searchResults?: SearchResult[];
  currentSearchResult: number;
  onSearchButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSearchInput: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChangeCurrentSearchClick: (
    direction: "prev" | "next"
  ) => (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRetryButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
      searchQuery,
      currentSearchResult,
      searchResults,
      onChangeCurrentSearchClick,
      onRetryButtonClick,
    } = this.props;

    return (
      <main className={cn(classes.container)}>
        <div className={cn(classes.searchContainer)}>
          {searchState !== "chat" ? (
            <Input
              value={searchQuery}
              id="search"
              onInput={onSearchInput}
              component="input"
              placeholder={t("Search...")}
              addonRight={searchState === "searchLoading" && <Loading />}
            />
          ) : null}
          {searchState === "searchNotFound" ? (
            <div>
              <Typography>
                <T message="Ooops..." />
              </Typography>
              <Button onClick={onRetryButtonClick} aria-label={t("Retry")}>
                <FontAwesomeIcon icon={faRedo} />
              </Button>
            </div>
          ) : null}
          {searchState === "searchFound" ? (
            <>
              <Button
                onClick={onChangeCurrentSearchClick("prev")}
                aria-label={t("Previous result")}
                disabled={currentSearchResult === 0}
              >
                <FontAwesomeIcon icon={faChevronUp} />
              </Button>
              <Typography>
                <T
                  message="{{ from }} of {{ to }}"
                  scope={{
                    from: currentSearchResult + 1,
                    to: searchResults?.length,
                  }}
                />
              </Typography>
              <Button
                onClick={onChangeCurrentSearchClick("next")}
                aria-label={t("Next result")}
                disabled={
                  currentSearchResult === (searchResults?.length || 0) - 1
                }
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </Button>
            </>
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
