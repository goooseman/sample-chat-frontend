/* eslint-disable @typescript-eslint/ban-ts-comment */
import ChatService, { ChatMessage } from "./ChatService";
import ChatAdapter from "./ChatAdapter";
import { fakeTransformedMessage } from "./__fixtures__";

let fakeAdapter: ChatAdapter;
let service: ChatService;
let emitMessage: (message: ChatMessage) => void;
let onMessagesListChangeSpy: jest.Mock;

beforeEach(() => {
  onMessagesListChangeSpy = jest.fn();
  // @ts-ignore
  fakeAdapter = {
    connect: jest.fn(),
    disconnect: jest.fn(),
    onMessage: jest.fn(),
    emitMessage: jest.fn(),
    emitListMessages: jest.fn(),
  };
  service = new ChatService(fakeAdapter);
  service.onMessagesListChange(onMessagesListChangeSpy);
  emitMessage = fakeAdapter.onMessage.mock.calls[0][0] as (
    message: ChatMessage
  ) => void;
});

it("should connect", async () => {
  await service.connect();
  expect(fakeAdapter.connect).toBeCalledTimes(1);
});

it("should disconnect", async () => {
  await service.disconnect();
  expect(fakeAdapter.disconnect).toBeCalledTimes(1);
});

it("should call cb after new message is recieved", async () => {
  emitMessage(fakeTransformedMessage);

  expect(onMessagesListChangeSpy).toBeCalledWith([fakeTransformedMessage]);
});
