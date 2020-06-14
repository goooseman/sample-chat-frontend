import React, { PureComponent } from "react";
import classes from "./ChatInput.css";
import cn from "clsx";
import Button from "src/components/ui-kit/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { withLocale, WithLocale } from "react-targem";

interface ChatInputProps extends WithLocale {
  onSubmit: (message: string) => void;
}

interface ChatInputState {
  message: string;
}

class ChatInput extends PureComponent<ChatInputProps, ChatInputState> {
  public state: ChatInputState = {
    message: "",
  };

  render(): React.ReactNode {
    const { t } = this.props;
    const { message } = this.state;

    return (
      <div className={cn(classes.container)}>
        <textarea
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
}

export default withLocale(ChatInput);
