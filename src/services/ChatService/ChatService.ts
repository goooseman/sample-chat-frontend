import ChatAdapter from "./ChatAdapter";

export interface ChatMessage {
  id: string;
  text: string;
  type: "inbox" | "outbox";
  username: string;
  createdAt: Date;
  status: "none" | "receivedByServer";
}

class ChatService {
  constructor(chatAdapter: ChatAdapter) {
    this.adapter = chatAdapter;
  }

  public async connect(): Promise<void> {
    return this.adapter.connect();
  }

  public async disconnect(): Promise<void> {
    return this.adapter.disconnect();
  }

  private adapter: ChatAdapter;
}

export default ChatService;
