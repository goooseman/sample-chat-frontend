import React from "react";
import {
  ChatMessage,
  getChatService,
  ChatService,
  SearchResult,
} from "src/services/ChatService";
import createContextHOC from "../createContextHOC";
import { WithLocale, withLocale } from "react-targem";

interface ChatContextProviderState {
  chatMessages: ChatMessage[];
  chatMessagesCount: number;
  chatMessagesUnreadCount: number;
}

interface ChatContextProviderProps extends WithLocale {
  username?: string;
  userId: string;
}

export interface WithChat extends ChatContextProviderState {
  sendMessage: (text: string) => void;
  searchMessage: (query: string) => Promise<SearchResult[]>;
  markAllAsRead: () => void;
}

const defaults: ChatContextProviderState = {
  chatMessages: [],
  chatMessagesCount: 0,
  chatMessagesUnreadCount: 0,
};

const { Provider, Consumer } = React.createContext<WithChat>({
  ...defaults,
  /* eslint-disable @typescript-eslint/no-empty-function */
  sendMessage: () => {},
  markAllAsRead: () => {},
  searchMessage: () => Promise.resolve([]),
  /* eslint-enable @typescript-eslint/no-empty-function */
});

class ChatContextProviderPure extends React.PureComponent<
  ChatContextProviderProps,
  ChatContextProviderState
> {
  private chatService?: ChatService;
  private originalHtmlTitle?: string;

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
      markAllAsRead: this.markAllAsRead,
      searchMessage: this.searchMessage,
    };

    return <Provider value={providerValue}>{props.children}</Provider>;
  }

  private searchMessage = (query: string) => {
    if (!this.chatService) {
      return Promise.resolve([]);
    }
    return this.chatService.search(query);
  };

  private handleMessagesListChange = (messagesList: {
    messages: ChatMessage[];
    count: number;
    unreadCount: number;
  }) => {
    this.setState({
      chatMessages: messagesList.messages,
      chatMessagesCount: messagesList.count,
      chatMessagesUnreadCount: messagesList.unreadCount,
    });

    if (messagesList.unreadCount > 0) {
      if (!this.originalHtmlTitle) {
        this.originalHtmlTitle = document.title;
      }
      document.title = this.props.tn(
        "New message is received!",
        "{{ count }} new messages are received!",
        messagesList.unreadCount
      );
      return;
    }

    if (this.originalHtmlTitle) {
      document.title = this.originalHtmlTitle;
      this.originalHtmlTitle = undefined;
    }
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

  private markAllAsRead = () => {
    this.chatService?.markAllAsRead();
  };

  private initChatService = () => {
    this.chatService = getChatService(this.props.userId);
    this.chatService.connect();
    this.chatService.onMessagesListChange(this.handleMessagesListChange);
  };
}

export const ChatContextProvider = withLocale(ChatContextProviderPure);

export const withChat = createContextHOC(Consumer);
export type { SearchResult };
