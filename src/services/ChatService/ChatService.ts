import ChatAdapter from "./ChatAdapter";

export interface ChatMessage {
  id: string;
  text: string;
  type: "inbox" | "outbox";
  username: string;
  createdAt: Date;
  status: "none" | "receivedByServer";
}

interface MessagesStore {
  [id: string]: ChatMessage;
}

interface MessagesListInternal {
  /** Store in an object to have O(1) time complexity to find a message */
  messages: MessagesStore;
  count: number;
  unreadCount: number;
}

interface MessagesList {
  messages: ChatMessage[];
  count: number;
  unreadCount: number;
}

const initialMessagesList = { messages: {}, count: 0, unreadCount: 0 };

class ChatService {
  private onMessagesListChangeCb?: (messagesList: MessagesList) => void;

  constructor(chatAdapter: ChatAdapter) {
    this.adapter = chatAdapter;
    this.adapter.onMessage(this.handleMessage);
  }

  public async connect(): Promise<void> {
    this.adapter.connect();
    const messagesList = await this.adapter.emitListMessages();
    this.messagesList.messages = messagesList.items.reduce(
      (obj: MessagesStore, m: ChatMessage) => {
        obj[m.id] = m;
        return obj;
      },
      {}
    );
    this.messagesList.count = messagesList.items.length;
    this.messagesList.unreadCount = 0;
    this.handleMessagesUpdate();
  }

  public async disconnect(): Promise<void> {
    return this.adapter.disconnect();
  }

  public async sendMessage(message: {
    text: string;
    username: string;
  }): Promise<void> {
    await this.adapter.emitMessage(message);
  }

  public onMessagesListChange(cb: (messagesList: MessagesList) => void): void {
    this.onMessagesListChangeCb = cb;
  }

  private handleMessage = (message: ChatMessage) => {
    if (!this.messagesList.messages[message.id]) {
      this.messagesList.unreadCount += 1;
    }
    this.messagesList.messages[message.id] = message;
    // In a real chat should come from server
    this.messagesList.count = Object.keys(this.messagesList.messages).length;

    this.handleMessagesUpdate();
  };

  private handleMessagesUpdate = () => {
    this.onMessagesListChangeCb &&
      this.onMessagesListChangeCb({
        messages: Object.values(this.messagesList.messages),
        count: this.messagesList.count,
        unreadCount: this.messagesList.unreadCount,
      });
  };

  private messagesList: MessagesListInternal = initialMessagesList;
  private adapter: ChatAdapter;
}

export default ChatService;
