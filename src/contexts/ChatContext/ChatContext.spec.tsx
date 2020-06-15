/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { ChatContextProvider } from "./ChatContext";
// @ts-ignore
import { getChatService, mockedService } from "src/services/ChatService";
import { render, fireEvent } from "__utils__/render";

jest.mock("src/services/ChatService");

beforeEach(jest.clearAllMocks);

describe("ChatContextProvider", () => {
  class ChatContextTester extends React.PureComponent {
    public state = {
      username: "foo",
      userId: "bar",
    };

    public render(): React.ReactNode {
      const { userId, username } = this.state;

      return (
        <>
          <button onClick={this.handleChangeUserIdClick}>Change userId</button>
          <ChatContextProvider
            userId={userId}
            username={username}
          ></ChatContextProvider>
        </>
      );
    }

    private handleChangeUserIdClick = () => {
      this.setState({
        userId: "new-id",
      });
    };
  }

  it("should initialize ChatService with provided userId", () => {
    render(<ChatContextTester />);
    expect(getChatService).toBeCalledTimes(1);
    expect(getChatService).toBeCalledWith("bar");
    expect(mockedService.connect).toBeCalledTimes(1);
    expect(mockedService.onMessagesListChange).toBeCalledTimes(1);
  });

  it("should disconnect old ChatService and initialize new one after userId is changed", () => {
    const { getByText } = render(<ChatContextTester />);
    fireEvent.click(getByText("Change userId"));

    expect(getChatService).toBeCalledTimes(2);
    expect(getChatService).toHaveBeenLastCalledWith("new-id");
    expect(mockedService.connect).toBeCalledTimes(2);
    expect(mockedService.onMessagesListChange).toBeCalledTimes(2);
    expect(mockedService.disconnect).toBeCalledTimes(1);
  });

  it("should fire disconnect after component is unmounted", () => {
    const { unmount } = render(<ChatContextTester />);
    unmount();

    expect(mockedService.disconnect).toBeCalledTimes(1);
  });

  it("should change browser's title if there is an unread message", () => {
    render(<ChatContextTester />);
    const changeMessageList = (mockedService.onMessagesListChange as jest.Mock)
      .mock.calls[0][0];

    changeMessageList({
      messages: 0,
      count: 0,
      unreadCount: 1,
    });

    expect(document.title).toBe("New message is received!");
  });

  it("should pluralize title correctly", () => {
    render(<ChatContextTester />);
    const changeMessageList = (mockedService.onMessagesListChange as jest.Mock)
      .mock.calls[0][0];

    changeMessageList({
      messages: 0,
      count: 0,
      unreadCount: 2,
    });

    expect(document.title).toBe("2 new messages are received!");
  });

  it("should rollback original title if no unread messages are left", () => {
    document.title = "some-title";
    render(<ChatContextTester />);
    const changeMessageList = (mockedService.onMessagesListChange as jest.Mock)
      .mock.calls[0][0];

    changeMessageList({
      messages: 0,
      count: 0,
      unreadCount: 1,
    });

    expect(document.title).toBe("New message is received!");

    changeMessageList({
      messages: 0,
      count: 0,
      unreadCount: 0,
    });

    expect(document.title).toBe("some-title");
  });
});
