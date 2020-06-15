import React, { PureComponent } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import ChatPage from "./ChatPage";
import { WithSettings, withSettings } from "src/contexts/SettingsContext";
import { Route } from "src/config/routes";
import { WithChat, withChat } from "src/contexts/ChatContext/ChatContext";

interface ChatPageContainerProps
  extends RouteComponentProps,
    WithSettings,
    WithChat {}

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
  }

  public componentDidUpdate() {
    this.setRedirectIfUsernameIsEmpty();
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
    if (!this.props.username || this.props.username === "") {
      this.setState({ redirectTo: "/settings" });
    }
  }
}

export default withChat(withSettings(ChatPageContainer));
