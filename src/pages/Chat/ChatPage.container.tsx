import React, { PureComponent } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import ChatPage, { SearchState } from "./ChatPage";
import { WithSettings, withSettings } from "src/contexts/SettingsContext";
import { Route } from "src/config/routes";
import { WithChat, withChat } from "src/contexts/ChatContext";
import { withLocale, WithLocale } from "react-targem";
import { createMachine } from "src/utils/gstate";

type SearchEvent =
  | "SWITCH_SEARCH"
  | "SEARCH"
  | "SEARCH_SUCCESS"
  | "SEARCH_FAILURE";
interface ChatPageContainerProps
  extends RouteComponentProps,
    WithSettings,
    WithChat,
    WithLocale {}

interface ChatPageContainerState {
  redirectTo?: Route;
  searchState: SearchState;
}

class ChatPageContainer extends PureComponent<
  ChatPageContainerProps,
  ChatPageContainerState
> {
  public searchMachine = createMachine<SearchState, SearchEvent>({
    chat: {
      transitions: {
        SWITCH_SEARCH: {
          target: "search",
        },
      },
    },
    search: {
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
      />
    );
  }

  private performSearchTransition = (event: SearchEvent) => {
    this.setState((s) => ({
      searchState: this.searchMachine.transition(s.searchState, event),
    }));
  };

  private handleSearchButtonClick = () => {
    this.performSearchTransition("SWITCH_SEARCH");
  };

  private handleSearchInput = () => {
    this.performSearchTransition("SEARCH");
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
