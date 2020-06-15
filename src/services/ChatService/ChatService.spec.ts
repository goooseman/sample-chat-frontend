/* eslint-disable @typescript-eslint/ban-ts-comment */
import ChatService, { ChatMessage } from "./ChatService";
import ChatAdapter from "./ChatAdapter";
import { fakeTransformedMessage } from "./__fixtures__";

const setupService = (
  options: {
    emitListMessagesRes?: unknown;
  } = {}
) => {
  const onMessagesListChangeSpy = jest.fn();

  // @ts-ignore
  const fakeAdapter: ChatAdapter = {
    connect: jest.fn(),
    disconnect: jest.fn(),
    onMessage: jest.fn(),
    emitMessage: jest.fn(),
    emitListMessages: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        items: options.emitListMessagesRes || [],
      });
    }),
  };
  const chatService = new ChatService(fakeAdapter);
  chatService.onMessagesListChange(onMessagesListChangeSpy);
  // @ts-ignore
  const emitMessage = fakeAdapter.onMessage.mock.calls[0][0] as (
    message: ChatMessage
  ) => void;

  return { chatService, emitMessage, fakeAdapter, onMessagesListChangeSpy };
};

it("should connect", async () => {
  const { chatService, fakeAdapter } = setupService();
  await chatService.connect();
  expect(fakeAdapter.connect).toBeCalledTimes(1);
  expect(fakeAdapter.emitListMessages).toBeCalledTimes(1);
});

it("should disconnect", async () => {
  const { chatService, fakeAdapter } = setupService();
  await chatService.disconnect();
  expect(fakeAdapter.disconnect).toBeCalledTimes(1);
});

it("should proceed initial messages", async () => {
  const { chatService, onMessagesListChangeSpy } = setupService({
    emitListMessagesRes: [fakeTransformedMessage],
  });
  await chatService.connect();

  expect(onMessagesListChangeSpy).toBeCalledTimes(1);
  expect(onMessagesListChangeSpy).toHaveBeenLastCalledWith({
    messages: [fakeTransformedMessage],
    count: 1,
    unreadCount: 0,
  });
});

it("should send chat message", async () => {
  const { chatService, fakeAdapter } = setupService();
  const message = { text: "foo", username: "bar" };
  await chatService.sendMessage(message);
  expect(fakeAdapter.onMessage).toBeCalledTimes(1);
  expect(fakeAdapter.emitMessage).toBeCalledWith(message);
});

it("should call cb after new message is recieved", () => {
  const { onMessagesListChangeSpy, emitMessage } = setupService();

  emitMessage(fakeTransformedMessage);

  expect(onMessagesListChangeSpy).toBeCalledWith(
    expect.objectContaining({
      messages: [fakeTransformedMessage],
      count: 1,
    })
  );
});

it("should not add two messages twice (usually used for Optimistic UI updates)", () => {
  const { emitMessage, onMessagesListChangeSpy } = setupService();

  emitMessage({ ...fakeTransformedMessage, status: "none" });
  emitMessage(fakeTransformedMessage);

  expect(onMessagesListChangeSpy).toBeCalledTimes(2);
  expect(onMessagesListChangeSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({
      messages: [fakeTransformedMessage],
      count: 1,
    })
  );
});

it("should return a new array every time (not to mutate original one)", () => {
  const { onMessagesListChangeSpy, emitMessage } = setupService();

  emitMessage(fakeTransformedMessage);

  const array1 = onMessagesListChangeSpy.mock.calls[0][0];

  emitMessage({ ...fakeTransformedMessage, id: "other" });

  expect(onMessagesListChangeSpy).toBeCalledTimes(2);
  expect(onMessagesListChangeSpy.mock.calls[1][0]).not.toBe(array1);
});

it("should clear unreadCount when markAllAsRead is used", () => {
  const { onMessagesListChangeSpy, emitMessage, chatService } = setupService();

  emitMessage(fakeTransformedMessage);
  chatService.markAllAsRead();

  expect(onMessagesListChangeSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({
      unreadCount: 0,
    })
  );
});
