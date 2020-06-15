import React from "react";
import {
  ChatMessage,
  getChatService,
  ChatService,
} from "src/services/ChatService";
import createContextHOC from "../createContextHOC";

interface ChatContextProviderState {
  chatMessages: ChatMessage[];
}

interface ChatContextProviderProps {
  username?: string;
  userId: string;
}

export interface WithChat extends ChatContextProviderState {
  sendMessage: (text: string) => void;
}

const defaults: ChatContextProviderState = {
  chatMessages: [],
};

const { Provider, Consumer } = React.createContext<WithChat>({
  ...defaults,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sendMessage: () => {},
});

export class ChatContextProvider extends React.PureComponent<
  ChatContextProviderProps,
  ChatContextProviderState
> {
  private chatService?: ChatService;

  constructor(props: ChatContextProviderProps) {
    super(props);
    this.state = defaults;
  }

  public componentDidMount(): void {
    this.initChatService();
  }

  public componentDidUpdate(prevProps: ChatContextProviderProps): void {
    if (prevProps.userId !== this.props.userId) {
      this.chatService?.disconnect();
      this.initChatService();
    }
  }

  public componentWillUnmount(): void {
    this.chatService?.disconnect();
  }

  public render(): React.ReactNode {
    const { state, props } = this;

    const providerValue = {
      ...state,
      sendMessage: this.sendMessage,
    };

    return <Provider value={providerValue}>{props.children}</Provider>;
  }

  private handleMessagesListChange = (messagesList: ChatMessage[]) => {
    this.setState({
      chatMessages: messagesList,
    });
  };

  private sendMessage = (text: string) => {
    const { username } = this.props;
    if (!username || username === "") {
      throw new Error("No username is specified");
    }
    if (!this.chatService) {
      throw new Error("Chat Service is not initialized");
    }
    this.chatService.sendMessage({ text, username });
  };

  private initChatService = () => {
    this.chatService = getChatService(this.props.userId);
    this.chatService.connect();
    this.chatService.onMessagesListChange(this.handleMessagesListChange);
  };
}

export const withChat = createContextHOC(Consumer);
