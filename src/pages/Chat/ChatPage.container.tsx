import React, { PureComponent } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import ChatPage from "./ChatPage";
import { WithSettings, withSettings } from "src/contexts/SettingsContext";
import { Route } from "src/config/routes";

interface ChatPageContainerProps extends RouteComponentProps, WithSettings {}

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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return <ChatPage chatMessages={[]} onSubmit={() => {}} />;
  }

  private setRedirectIfUsernameIsEmpty() {
    if (!this.props.username || this.props.username === "") {
      this.setState({ redirectTo: "/settings" });
    }
  }
}

export default withSettings(ChatPageContainer);
