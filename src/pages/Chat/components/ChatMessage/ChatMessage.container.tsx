import React, { PureComponent } from "react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import AwaitLock from "await-lock";

interface ChatMessageContainerProps extends ChatMessageProps {
  text: string;
}

interface ChatMessageContainerState {
  imageSrc?: string;
}

const linkRegexp = /(https?:\/\/[\w-\.\/\:\?\=\&]+)/gi;
const imageContentTypeRegexp = /^image\//;

class ChatMessageContainer extends PureComponent<
  ChatMessageContainerProps,
  ChatMessageContainerState
> {
  public state: ChatMessageContainerState = {};
  public isImageLinkCache: { [link: string]: boolean } = {};
  public isImageLinkLock: AwaitLock = new AwaitLock();
  public isUnmounted = false;

  public componentWillUnmount(): void {
    this.isUnmounted = true;
  }

  render(): React.ReactNode {
    return (
      <ChatMessage
        {...this.props}
        text={this.getText()}
        imageSrc={this.state.imageSrc}
      />
    );
  }

  private getText = (): React.ReactNode => {
    const { text } = this.props;
    const links: string[] = [];
    // https://stackoverflow.com/a/33238464
    const parts: (string | JSX.Element)[] = text.split(linkRegexp);
    for (let i = 1; i < parts.length; i += 2) {
      links.push(parts[i] as string);
      parts[i] = (
        <a key={"link" + i} href={parts[i] as string}>
          {parts[i]}
        </a>
      );
    }
    void this.checkLinksForImages(links);

    return parts;
  };

  private checkLinksForImages = async (links: string[]): Promise<void> => {
    for (const link of links) {
      if (this.isUnmounted) {
        return;
      }
      const isImageLink = await this.isImageLink(link);
      if (isImageLink) {
        this.setState({
          imageSrc: link,
        });
        return;
      }
    }
  };

  private async isImageLink(link: string): Promise<boolean> {
    await this.isImageLinkLock.acquireAsync();
    try {
      if (this.isImageLinkCache[link]) {
        return this.isImageLinkCache[link];
      }

      const headResponse: Response = await window.fetch(link, {
        method: "HEAD",
      });
      if (headResponse.status === 301 || headResponse.status === 302) {
        const location = headResponse.headers.get("Location");
        if (location) {
          const result = await this.isImageLink(location);
          this.isImageLinkCache[link] = result;
          return result;
        }
        return false;
      }

      const contentType = headResponse.headers.get("Content-Type");
      const result = imageContentTypeRegexp.test(contentType || "");

      this.isImageLinkCache[link] = result;
      return result;
    } finally {
      this.isImageLinkLock.release();
    }
  }
}

export default ChatMessageContainer;
