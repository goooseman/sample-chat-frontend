import React, { PureComponent } from "react";
import classes from "./ChatMessage.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import TimeDisplay from "src/components/TimeDisplay";

interface ChatMessageProps {
  text: string;
  isSent: boolean;
  username: string;
  createdAt: Date;
}

class ChatMessage extends PureComponent<ChatMessageProps> {
  render(): React.ReactNode {
    const { createdAt, isSent, username, text } = this.props;

    return (
      <div
        className={cn({
          [classes.container]: true,
          [classes.sent]: isSent,
          [classes.received]: !isSent,
        })}
      >
        <Typography
          color="muted"
          gutterBottom={false}
          size="small"
          className={cn({
            [classes.username]: true,
          })}
        >
          {username}
        </Typography>
        <div
          className={cn({
            [classes.bubbleContainer]: true,
          })}
        >
          <div className={cn(classes.triangle)} />
          <div className={cn(classes.bubble)}>
            <Typography gutterBottom={false}>{text}</Typography>
          </div>

          <Typography
            color="muted"
            className={cn(classes.date)}
            gutterBottom={false}
            size="small"
          >
            <TimeDisplay date={createdAt} />
          </Typography>
        </div>
      </div>
    );
  }
}

export default ChatMessage;
