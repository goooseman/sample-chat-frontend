import React, { PureComponent } from "react";
import classes from "./ChatInput.css";
import cn from "clsx";
import Button from "src/components/ui-kit/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { withLocale, WithLocale } from "react-targem";
import Input from "src/components/ui-kit/Input";

export interface ChatInputPureProps {
  onSubmit: (message: string) => void;
}

interface ChatInputProps extends ChatInputPureProps, WithLocale {
  isCtrlEnterToSend: boolean;
}

interface ChatInputState {
  message: string;
}

/**
 * Custom `Input` component to be used as a drop-in replacement for `<textarea /> and `<input />`.
 */
class ChatInput extends PureComponent<ChatInputProps, ChatInputState> {
  public state: ChatInputState = {
    message: "",
  };

  public componentDidMount() {
    if (this.props.isCtrlEnterToSend) {
      document.addEventListener("keypress", this.handleKeyDown);
    }
  }

  public componentWillUnmount() {
    /** Props could change while component was mounted, so it is a good idea to remove event listener anyway */
    document.removeEventListener("keypress", this.handleKeyDown);
  }

  render(): React.ReactNode {
    const { t } = this.props;
    const { message } = this.state;

    return (
      <div className={cn(classes.container)}>
        <Input
          type="textarea"
          aria-label={t("Message contents")}
          value={message}
          onChange={this.handleInputChange}
          className={cn(classes.textarea)}
          placeholder={t("Type a message...")}
        />
        <Button onClick={this.handleSubmit}>
          <FontAwesomeIcon icon={faEnvelope} title={t("Send!")} />
        </Button>
      </div>
    );
  }

  private handleSubmit = () => {
    this.props.onSubmit(this.state.message);
    this.setState((s: ChatInputState) => ({
      ...s,
      message: "",
    }));
  };

  /** This is a View-related business logic, which should remain in the View component */
  private handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    this.setState({
      message: event.target.value,
    });
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.keyCode === 13 && event.ctrlKey) {
      this.handleSubmit();
      return;
    }
    if (event.keyCode === 10 && event.ctrlKey) {
      this.handleSubmit();
      return;
    }
    return;
  };
}

export default withLocale(ChatInput);
