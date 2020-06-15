import ChatAdapter from "./ChatAdapter";

export interface ChatMessage {
  id: string;
  text: string;
  type: "inbox" | "outbox";
  username: string;
  createdAt: Date;
  status: "none" | "receivedByServer";
}

interface MessagesList {
  /** Store in an object to have O(1) time complexity to find a message */
  messages: {
    [id: string]: ChatMessage;
  };
  onChangeCb?: (messages: ChatMessage[]) => void;
}

const initialMessagesList = { messages: {} };

class ChatService {
  constructor(chatAdapter: ChatAdapter) {
    this.adapter = chatAdapter;
    this.adapter.onMessage(this.handleMessage);
  }

  public async connect(): Promise<void> {
    return this.adapter.connect();
  }

  public async disconnect(): Promise<void> {
    return this.adapter.disconnect();
  }

  public onMessagesListChange(cb: MessagesList["onChangeCb"]): void {
    this.messagesList.onChangeCb = cb;
  }

  private handleMessage = (message: ChatMessage) => {
    const { messagesList } = this;
    messagesList.messages[message.id] = message;
    messagesList.onChangeCb &&
      messagesList.onChangeCb(Object.values(messagesList.messages));
  };

  private messagesList: MessagesList = initialMessagesList;
  private adapter: ChatAdapter;
}

export default ChatService;
