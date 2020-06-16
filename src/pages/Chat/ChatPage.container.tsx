import React, { PureComponent } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import ChatPage from "./ChatPage";
import { WithSettings, withSettings } from "src/contexts/SettingsContext";
import { Route } from "src/config/routes";
import { WithChat, withChat } from "src/contexts/ChatContext";
import { withLocale, WithLocale } from "react-targem";

interface ChatPageContainerProps
  extends RouteComponentProps,
    WithSettings,
    WithChat,
    WithLocale {}

interface ChatPageContainerState {
  redirectTo?: Route;
}

class ChatPageContainer extends PureComponent<
  ChatPageContainerProps,
  ChatPageContainerState
> {
  public state: ChatPageContainerState = {};

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
      />
    );
  }

  private setRedirectIfUsernameIsEmpty() {
    const { username, t } = this.props;
    if (!username || username === "") {
      window.alert(t("Please, specify username to use chat"));
      this.setState({ redirectTo: "/settings" });
    }
  }
}

export default withLocale(withChat(withSettings(ChatPageContainer)));
