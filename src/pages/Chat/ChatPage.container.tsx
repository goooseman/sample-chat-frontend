import React, { PureComponent } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import ChatPage, { SearchState } from "./ChatPage";
import { WithSettings, withSettings } from "src/contexts/SettingsContext";
import { Route } from "src/config/routes";
import { WithChat, withChat, SearchResult } from "src/contexts/ChatContext";
import { withLocale, WithLocale } from "react-targem";
import { createMachine, EmptyEvent } from "src/utils/gstate";

type SearchEventNames =
  | "SWITCH_SEARCH"
  | "SEARCH"
  | "SEARCH_SUCCESS"
  | "SEARCH_FAILURE";

interface SwitchSearchEvent extends EmptyEvent<SearchEventNames> {
  type: "SWITCH_SEARCH";
}
interface SearchEvent extends EmptyEvent<SearchEventNames> {
  type: "SEARCH";
  payload: string;
}

interface SearchSuccessEvent extends EmptyEvent<SearchEventNames> {
  type: "SEARCH_SUCCESS";
  payload: SearchResult[];
}

interface SearchFailureEvent extends EmptyEvent<SearchEventNames> {
  type: "SEARCH_FAILURE";
}

type SearchEvents =
  | SwitchSearchEvent
  | SearchEvent
  | SearchSuccessEvent
  | SearchFailureEvent;

interface ChatPageContainerProps
  extends RouteComponentProps,
    WithSettings,
    WithChat,
    WithLocale {}

interface ChatPageContainerState {
  redirectTo?: Route;
  searchState: SearchState;
  searchQuery: string;
  searchResults?: SearchResult[];
  currentSearchResult: number;
}

class ChatPageContainer extends PureComponent<
  ChatPageContainerProps,
  ChatPageContainerState
> {
  public searchMachine = createMachine<
    SearchState,
    SearchEventNames,
    SearchEvents
  >({
    chat: {
      transitions: {
        SWITCH_SEARCH: {
          target: "search",
        },
      },
    },
    search: {
      actions: {
        onEnter: () => {
          this.setState({
            searchQuery: "",
          });
        },
      },
      transitions: {
        SEARCH: {
          target: "searchLoading",
        },
        SWITCH_SEARCH: {
          target: "chat",
        },
      },
    },
    searchLoading: {
      actions: {
        onEnter: async (event) => {
          if (event.type !== "SEARCH") {
            return;
          }
          try {
            const results = await this.props.searchMessage(event.payload);
            this.performSearchTransition({
              type: "SEARCH_SUCCESS",
              payload: results,
            });
          } catch (e) {
            this.performSearchTransition({
              type: "SEARCH_FAILURE",
            });
          }
        },
      },
      transitions: {
        SEARCH_SUCCESS: {
          target: "searchFound",
        },
        SEARCH_FAILURE: {
          target: "searchNotFound",
        },
        SWITCH_SEARCH: {
          target: "chat",
        },
      },
    },
    searchNotFound: {
      transitions: {
        SWITCH_SEARCH: {
          target: "chat",
        },
        SEARCH: {
          target: "searchLoading",
        },
      },
    },
    searchFound: {
      actions: {
        onEnter: (event) => {
          if (event.type !== "SEARCH_SUCCESS") {
            return;
          }
          this.setState({ searchResults: event.payload });
        },
      },
      transitions: {
        SWITCH_SEARCH: {
          target: "chat",
        },
        SEARCH: {
          target: "searchLoading",
        },
      },
    },
    initialState: "chat",
  });

  public state: ChatPageContainerState = {
    searchState: this.searchMachine.value,
    searchQuery: "",
    currentSearchResult: 0,
  };

  public componentDidMount() {
    this.setRedirectIfUsernameIsEmpty();
    this.props.markAllAsRead();
  }

  public componentDidUpdate(prevProps: ChatPageContainerProps) {
    if (this.props.username !== prevProps.username) {
      this.setRedirectIfUsernameIsEmpty();
    }

    if (this.props.chatMessagesUnreadCount > 0) {
      this.props.markAllAsRead();
    }
  }

  public render(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <ChatPage
        chatMessages={this.props.chatMessages}
        onSubmit={this.props.sendMessage}
        searchState={this.state.searchState}
        onSearchButtonClick={this.handleSearchButtonClick}
        onSearchInput={this.handleSearchInput}
        onChangeCurrentSearchClick={this.handleChangeCurrentSearchClick}
        searchResults={this.state.searchResults}
        searchQuery={this.state.searchQuery}
        currentSearchResult={this.state.currentSearchResult}
        onRetryButtonClick={this.handleRetryButtonClick}
      />
    );
  }

  private performSearchTransition = (event: SearchEvents) => {
    this.setState((s) => ({
      searchState: this.searchMachine.transition(s.searchState, event),
    }));
  };

  private handleSearchButtonClick = () => {
    this.performSearchTransition({ type: "SWITCH_SEARCH" });
  };

  private handleRetryButtonClick = () => {
    this.performSearchTransition({
      type: "SEARCH",
      payload: this.state.searchQuery,
    });
  };

  private handleChangeCurrentSearchClick = (dir: "next" | "prev") => () => {
    let modifier: number;
    switch (dir) {
      case "next":
        modifier = 1;
        break;
      case "prev":
        modifier = -1;
        break;
    }
    this.setState((s) => ({
      currentSearchResult: s.currentSearchResult + modifier,
    }));
  };

  private handleSearchInput = (event: React.MouseEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    this.setState({
      searchQuery: query,
    });
    this.performSearchTransition({ type: "SEARCH", payload: query });
  };

  private setRedirectIfUsernameIsEmpty() {
    const { username, t } = this.props;
    if (!username || username === "") {
      window.alert(t("Please, specify username to use chat"));
      this.setState({ redirectTo: "/settings" });
    }
  }
}

export default withLocale(withChat(withSettings(ChatPageContainer)));
