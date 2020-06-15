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
  // @ts-ignore
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

it("should send chat message", async () => {
  const message = { text: "foo", username: "bar" };
  await service.sendMessage(message);
  expect(fakeAdapter.onMessage).toBeCalledTimes(1);
  expect(fakeAdapter.emitMessage).toBeCalledWith(message);
});

it("should call cb after new message is recieved", () => {
  emitMessage(fakeTransformedMessage);

  expect(onMessagesListChangeSpy).toBeCalledWith([fakeTransformedMessage]);
});

it("should not add two messages twice (usually used for Optimistic UI updates)", () => {
  emitMessage({ ...fakeTransformedMessage, status: "none" });
  emitMessage(fakeTransformedMessage);

  expect(onMessagesListChangeSpy).toBeCalledTimes(2);
  expect(onMessagesListChangeSpy).toHaveBeenLastCalledWith([
    fakeTransformedMessage,
  ]);
});

it("should return a new array every time (not to mutate original one)", () => {
  emitMessage(fakeTransformedMessage);

  const array1 = onMessagesListChangeSpy.mock.calls[0][0];

  emitMessage({ ...fakeTransformedMessage, id: "other" });

  expect(onMessagesListChangeSpy).toBeCalledTimes(2);
  expect(onMessagesListChangeSpy.mock.calls[1][0]).not.toBe(array1);
});
