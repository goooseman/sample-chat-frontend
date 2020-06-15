/* eslint-disable @typescript-eslint/no-empty-function */
import { EventEmitter } from "events";
import { Socket } from "socket.io-client";
import {
  fakeIncomingMessage,
  fakeTransformedMessage,
  userId,
} from "./__fixtures__";
import ChatAdapter from "./ChatAdapter";

class FakeSocket extends EventEmitter {
  public connect() {}
  public disconnect() {}
  public open() {}
  public close() {}
  public emit(eventName: string, ...args: unknown[]) {
    const cb = args.splice(-1)[0] as (response?: Object) => void;
    super.emit(eventName, ...args);
    cb({});
    return true;
  }
}

const createFakeAdapter = async () => {
  const socketServer = (new FakeSocket() as unknown) as typeof Socket;
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
