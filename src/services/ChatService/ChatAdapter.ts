import { Socket } from "socket.io-client";
import { ChatMessage } from "./ChatService";
import { v4 as uuidv4 } from "uuid";

export interface ChatAdapterMessage {
  id: string;
  userId: string;
  text: string;
  username: string;
  createdAt: string;
  status: "none" | "receivedByServer";
}

type ChatEmitNames = "message";

type SocketResponse<R> =
  | {
      err: Error;
      res: undefined;
    }
  | {
      err: undefined;
      res: R;
    };

type OnMessageCb = (data: ChatMessage) => void;

class ChatAdapter {
  private socket: typeof Socket;
  private userId: string;
  private onMessageCb?: OnMessageCb;

  constructor(socket: typeof Socket, userId: string) {
    this.socket = socket;
    this.userId = userId;
    this.socket.on("disconnect", this.handleDisconnected);
    this.socket.on("message", (message: ChatAdapterMessage) => {
      this.onMessageCb &&
        this.onMessageCb(this.transformChatAdapterMessage(message));
    });
  }

  public connect(): void {
    this.socket.open();
  }

  public disconnect(): void {
    this.socket.close();
  }

  public onMessage(cb: (data: ChatMessage) => void): void {
    this.onMessageCb = cb;
  }

  public async emitMessage(message: {
    text: string;
    username: string;
  }): Promise<void> {
    const messageToSend = {
      ...message,
      userId: this.userId,
      status: "none",
      id: uuidv4(),
    } as const;
    await this.emitAsync<ChatAdapterMessage>("message", messageToSend);
    this.onMessageCb &&
      this.onMessageCb({
        ...messageToSend,
        type: "outbox",
        createdAt: new Date(),
      });
    return;
  }

  private emitAsync<R>(
    eventName: ChatEmitNames,
    ...args: unknown[]
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      this.socket.emit(eventName, ...args, (response: SocketResponse<R>) => {
        if (response.err) {
          reject(response.err);
        }
        resolve(response.res);
      });
    });
  }

  private transformChatAdapterMessage = (
    message: ChatAdapterMessage
  ): ChatMessage => {
    return {
      id: message.id,
      username: message.username,
      type: this.userId === message.userId ? "outbox" : "inbox",
      text: message.text,
      createdAt: new Date(message.createdAt),
      status: message.status,
    };
  };

  private handleDisconnected = (reason: string) => {
    if (reason === "io server disconnect") {
      // the disconnection was initiated by the server, you need to reconnect manually
      this.socket.connect();
    }
    // else the socket will automatically try to reconnect
  };
}

export default ChatAdapter;
