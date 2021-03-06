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
  style?: React.CSSProperties;
}

class ChatPage extends PureComponent<ChatPageProps> {
  public chatRef = React.createRef<HTMLDivElement>();
  public currentSearchedMessageRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.scrollChatToBottom();
    this.scrollToSearchedMessage();
  }

  public componentDidUpdate(prevProps: ChatPageProps): void {
    const chat = this.chatRef.current;
    if (chat && chat.scrollHeight - chat.scrollTop !== chat.clientHeight) {
      this.scrollChatToBottom();
    }
    if (
      prevProps.currentSearchResult !== this.props.currentSearchResult ||
      prevProps.searchResults !== this.props.searchResults
    ) {
      this.scrollToSearchedMessage();
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
      style,
    } = this.props;

    return (
      <main className={cn(classes.container)} style={style}>
        {searchState !== "chat" ? (
          <div className={cn(classes.searchContainer)}>
            <Input
              className={cn(classes.searchInput)}
              value={searchQuery}
              id="search"
              onInput={onSearchInput}
              component="input"
              placeholder={t("Search...")}
              addonRight={searchState === "searchLoading" && <Loading />}
            />

            {searchState === "searchNotFound" ? (
              <div>
                <Typography>
                  <T message="Ooops..." />
                </Typography>
                <Button
                  size="sm"
                  color="secondary"
                  onClick={onRetryButtonClick}
                  aria-label={t("Retry")}
                >
                  <FontAwesomeIcon fixedWidth icon={faRedo} />
                </Button>
              </div>
            ) : null}
            {searchState === "searchFound" && searchResults ? (
              <div className={cn(classes.searchNavigator)}>
                <Button
                  size="sm"
                  onClick={onChangeCurrentSearchClick("prev")}
                  aria-label={t("Previous result")}
                  disabled={currentSearchResult === 0}
                >
                  <FontAwesomeIcon fixedWidth icon={faChevronUp} />
                </Button>
                <Typography gutterBottom={false} color="contrast">
                  <T
                    message="{{ from }} of {{ to }}"
                    scope={{
                      from:
                        searchResults.length > 0 ? currentSearchResult + 1 : 0,
                      to: searchResults.length || 0,
                    }}
                  />
                </Typography>
                <Button
                  onClick={onChangeCurrentSearchClick("next")}
                  aria-label={t("Next result")}
                  size="sm"
                  disabled={currentSearchResult >= searchResults.length - 1}
                >
                  <FontAwesomeIcon fixedWidth icon={faChevronDown} />
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
        <Button
          className={cn(classes.searchButton)}
          onClick={onSearchButtonClick}
          color="secondary"
          size="sm"
        >
          <FontAwesomeIcon
            fixedWidth
            icon={searchState === "chat" ? faSearch : faTimes}
            title={
              searchState === "chat" ? t("Open search") : t("Close search")
            }
          />
        </Button>
        <div className={cn(classes.messagesContainer)} ref={this.chatRef}>
          {chatMessages.map((c) => {
            const isCurrentSearch = searchResults
              ? searchResults[currentSearchResult]?.id === c.id
              : false;
            return (
              <ChatMessage
                messageRef={
                  isCurrentSearch ? this.currentSearchedMessageRef : undefined
                }
                isCurrentSearch={isCurrentSearch}
                onLoad={this.handleImageLoad}
                key={c.id}
                {...c}
              />
            );
          })}
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

  private scrollToSearchedMessage() {
    const { searchResults } = this.props;
    const chat = this.chatRef.current;
    const currentSearchedMessage = this.currentSearchedMessageRef.current;
    if (!chat || !currentSearchedMessage || !searchResults) {
      return;
    }

    chat.scrollTop =
      currentSearchedMessage.offsetTop +
      currentSearchedMessage.clientHeight -
      chat.clientHeight;
  }
}

export default withLocale(ChatPage);
