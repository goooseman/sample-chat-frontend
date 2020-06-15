/* eslint-disable @typescript-eslint/no-empty-function */
import { EventEmitter } from "events";
import { Socket } from "socket.io-client";
import {
  fakeIncomingMessage,
  fakeTransformedMessage,
  userId,
} from "./__fixtures__";
import ChatAdapter from "./ChatAdapter";

interface FakeSocketOptions {
  isOffline: boolean;
  emitResponse: Object;
}

const defaultFakeSocketOptions = {
  isOffline: false,
  emitResponse: {},
};

class FakeSocket extends EventEmitter {
  private options: FakeSocketOptions;

  public constructor(options: Partial<FakeSocketOptions> = {}) {
    super();
    this.options = { ...defaultFakeSocketOptions, ...options };
  }

  public connect() {}
  public disconnect() {}
  public open() {}
  public close() {}
  public emit(eventName: string, ...args: unknown[]) {
    const cb = args.splice(-1)[0] as (response?: Object) => void;
    cb({
      res: this.options.emitResponse,
    });
    if (this.options.isOffline) {
      return true;
    }
    super.emit(eventName, ...args);
    return true;
  }
}

const createFakeAdapter = async (options?: Partial<FakeSocketOptions>) => {
  const socketServer = (new FakeSocket(options) as unknown) as typeof Socket;
  const adapter = new ChatAdapter(socketServer, userId);
  await adapter.connect();
  return { socketServer, adapter };
};

it("should transform a message received from service to our schema", async () => {
  const { socketServer, adapter } = await createFakeAdapter();
  const onMessageSpy = jest.fn();
  adapter.onMessage(onMessageSpy);

  socketServer.emit("message", fakeIncomingMessage, () => {});
  expect(onMessageSpy).toBeCalledTimes(1);
  expect(onMessageSpy).toBeCalledWith(fakeTransformedMessage);
});

it("should transform a message send by me with type: outbox", async () => {
  const { socketServer, adapter } = await createFakeAdapter();
  const onMessageSpy = jest.fn();
  adapter.onMessage(onMessageSpy);

  socketServer.emit("message", { ...fakeIncomingMessage, userId }, () => {});
  expect(onMessageSpy).toBeCalledTimes(1);
  expect(onMessageSpy).toBeCalledWith({
    ...fakeTransformedMessage,
    type: "outbox",
  });
});

it("should send a chat Message", async () => {
  const { socketServer, adapter } = await createFakeAdapter();
  const onServerMessageSpy = jest.fn();
  socketServer.on("message", onServerMessageSpy);

  await adapter.emitMessage({
    text: "foo",
    username: "bar",
  });
  expect(onServerMessageSpy).toBeCalledTimes(1);
  expect(onServerMessageSpy).toBeCalledWith({
    id: expect.any(String),
    text: "foo",
    username: "bar",
    userId,
    status: "none",
  });
});

it("should send two messages with different ids", async () => {
  const { socketServer, adapter } = await createFakeAdapter();
  const onServerMessageSpy = jest.fn();
  socketServer.on("message", onServerMessageSpy);

  await adapter.emitMessage({
    text: "foo",
    username: "bar",
  });
  await adapter.emitMessage({
    text: "foo",
    username: "bar",
  });
  expect(onServerMessageSpy).toBeCalledTimes(2);
  expect(onServerMessageSpy).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({
      id: expect.not.stringMatching(onServerMessageSpy.mock.calls[0][0].id),
    })
  );
});

it("should have an optimistic UI update", async () => {
  const { adapter } = await createFakeAdapter({ isOffline: true });
  const onMessageSpy = jest.fn();
  adapter.onMessage(onMessageSpy);

  await adapter.emitMessage({
    text: "foo",
    username: "bar",
  });
  expect(onMessageSpy).toBeCalledTimes(1);
  expect(onMessageSpy).toBeCalledWith({
    id: expect.any(String),
    createdAt: expect.any(Date),
    type: "outbox",
    text: "foo",
    username: "bar",
    userId,
    status: "none",
  });
});

it("should listMessages and transform them", async () => {
  const { adapter } = await createFakeAdapter({
    emitResponse: {
      items: [fakeIncomingMessage],
    },
  });

  const messages = await adapter.emitListMessages();

  expect(messages.items).toEqual([fakeTransformedMessage]);
});
