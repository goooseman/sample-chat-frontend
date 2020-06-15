import socketIoClient from "socket.io-client";
import ChatAdapter from "./ChatAdapter";
import ChatService from "./ChatService";

const CHAT_BACKEND_URL = "";

export const getChatService = (userId: string): ChatService => {
  const socket = socketIoClient(`${CHAT_BACKEND_URL}/chat`, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 3 * 1000,
    transports: ["polling"],
    forceNew: true,
    multiplex: false,
  });

  const chatAdapter = new ChatAdapter(socket, userId);
  const chatService = new ChatService(chatAdapter);
  return chatService;
};
