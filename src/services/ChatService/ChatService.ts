export interface ChatMessage {
  id: string;
  text: string;
  type: "inbox" | "outbox";
  username: string;
  createdAt: Date;
  status: "none" | "receivedByServer";
}
