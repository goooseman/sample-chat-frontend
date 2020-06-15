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
});
