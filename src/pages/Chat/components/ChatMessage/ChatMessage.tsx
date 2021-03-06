import React, { PureComponent } from "react";
import classes from "./ChatMessage.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import TimeDisplay from "src/components/TimeDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { WithLocale, withLocale } from "react-targem";
import YouTube from "react-youtube";

export interface ChatMessageProps {
  text: React.ReactNode;
  type: "inbox" | "outbox";
  username: string;
  createdAt: Date;
  status: "none" | "receivedByServer";
  imageSrc?: string;
  youtubeId?: string;
  onLoad: () => void;
  isCurrentSearch: boolean;
  messageRef?: React.RefObject<HTMLDivElement>;
}

class ChatMessage extends PureComponent<ChatMessageProps & WithLocale> {
  render(): React.ReactNode {
    const {
      createdAt,
      type,
      username,
      text,
      imageSrc,
      t,
      onLoad,
      youtubeId,
      isCurrentSearch,
      messageRef,
    } = this.props;

    return (
      <div
        ref={messageRef}
        className={cn(classes.container, {
          [classes.inbox]: type === "inbox",
          [classes.outbox]: type === "outbox",
          [classes.isCurrentSearch]: isCurrentSearch,
        })}
      >
        {type === "inbox" ? (
          <Typography
            color="muted"
            gutterBottom={false}
            size="small"
            className={cn(classes.username)}
          >
            {username}
          </Typography>
        ) : null}

        <div className={cn(classes.bubbleContainer)}>
          <div className={cn(classes.triangle)} />
          <div className={cn(classes.bubble)}>
            <div className={cn(classes.bubbleContent)}>
              <Typography gutterBottom={false}>{text}</Typography>
            </div>
            {imageSrc ? (
              <a
                href={imageSrc}
                target="_blank"
                rel="noreferrer"
                aria-label={t("Open image in a new tab")}
              >
                <img
                  alt={t("Image from the message")}
                  src={imageSrc}
                  className={cn(classes.image)}
                  onLoad={onLoad}
                />
              </a>
            ) : null}
            {youtubeId ? (
              <div
                aria-label={t("Youtube player")}
                className={cn(classes.youtubeContainer)}
              >
                <YouTube videoId={youtubeId} className={cn(classes.youtube)} />
              </div>
            ) : null}
          </div>

          <Typography
            color="muted"
            className={cn(classes.date)}
            gutterBottom={false}
            size="small"
          >
            <>
              {this.getStatusIcon()} <TimeDisplay date={createdAt} />
            </>
          </Typography>
        </div>
      </div>
    );
  }

  private getStatusIcon = () => {
    const { status, type } = this.props;
    if (status === "receivedByServer" && type === "outbox") {
      return <FontAwesomeIcon icon={faCheck} />;
    }
    return null;
  };
}

export default withLocale(ChatMessage);
