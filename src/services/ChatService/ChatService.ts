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

interface MessagesList {
  /** Store in an object to have O(1) time complexity to find a message */
  messages: MessagesStore;
  onChangeCb?: (messages: ChatMessage[]) => void;
}

const initialMessagesList = { messages: {} };

class ChatService {
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

  public onMessagesListChange(cb: MessagesList["onChangeCb"]): void {
    this.messagesList.onChangeCb = cb;
  }

  private handleMessage = (message: ChatMessage) => {
    this.messagesList.messages[message.id] = message;
    this.handleMessagesUpdate();
  };

  private handleMessagesUpdate = () => {
    this.messagesList.onChangeCb &&
      this.messagesList.onChangeCb(Object.values(this.messagesList.messages));
  };

  private messagesList: MessagesList = initialMessagesList;
  private adapter: ChatAdapter;
}

export default ChatService;
