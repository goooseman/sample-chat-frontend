export const mockedService = {
  connect: jest.fn(),
  disconnect: jest.fn(),
  sendMessage: jest.fn(),
  onMessagesListChange: jest.fn(),
};

export const getChatService = jest.fn().mockImplementation(() => {
  return mockedService;
});
