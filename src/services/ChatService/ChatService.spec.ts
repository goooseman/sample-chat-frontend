import ChatService from "./ChatService";
import ChatAdapter from "./ChatAdapter";

let fakeAdapter: ChatAdapter;

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fakeAdapter = {
    connect: jest.fn(),
    disconnect: jest.fn(),
    onMessage: jest.fn(),
    emitMessage: jest.fn(),
    emitListMessages: jest.fn(),
  };
});

it("should connect", async () => {
  const service = new ChatService(fakeAdapter);
  await service.connect();
  expect(fakeAdapter.connect).toBeCalledTimes(1);
});

it("should disconnect", async () => {
  const service = new ChatService(fakeAdapter);
  await service.connect();
  expect(fakeAdapter.connect).toBeCalledTimes(1);
});
