import socketIoClient from "socket.io-client";
import ChatAdapter from "./ChatAdapter";
import ChatService, { ChatMessage, SearchResult } from "./ChatService";
import { CHAT_BACKEND_URL } from "src/config/env";

export const getChatService = (userId: string): ChatService => {
  const socket = socketIoClient(CHAT_BACKEND_URL, {
    path: "/chat",
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 3 * 1000,
    forceNew: false,
    multiplex: false,
    transports: ["polling", "websocket"],
  });

  const chatAdapter = new ChatAdapter(socket, userId);
  const chatService = new ChatService(chatAdapter);
  return chatService;
};

export { ChatService };
export type { ChatMessage, SearchResult };
