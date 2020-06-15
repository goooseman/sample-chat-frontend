import { ChatAdapterMessage } from "../ChatAdapter";
import { ChatMessage } from "../ChatService";

export const fakeIncomingMessage: ChatAdapterMessage = {
  id: "1",
  userId: "not-me",
  username: "user-goland",
  text: "A very informative message!",
  createdAt: "2018-12-26T15:00:00.000Z",
  status: "receivedByServer",
};

export const userId = "a3829b4f-b2f3-4df0-8e04-f25b17791e29";

export const fakeTransformedMessage: ChatMessage = {
  id: "1",
  username: "user-goland",
  type: "inbox",
  text: "A very informative message!",
  createdAt: new Date("2018-12-26T15:00:00.000Z"),
  status: "receivedByServer",
};
