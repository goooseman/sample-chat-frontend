import React from "react";
import ChatPage from "./ChatPage";
import { action } from "@storybook/addon-actions";

export default { title: "pages/Chat", component: ChatPage };

const defaultRecievedChatMessage = {
  type: "inbox" as const,
  username: "PimpMasta",
  createdAt: new Date(2020, 0, 1),
  status: "none" as const,
};

const defaulSentChatMessage = {
  type: "outbox" as const,
  username: "HolyGrandma",
  createdAt: new Date(2020, 0, 1),
  status: "receivedByServer" as const,
};

const getChatMessages = (idPrefix: string) => [
  {
    ...defaultRecievedChatMessage,
    id: `${idPrefix}1`,
    text: "Want to bang tonight?",
    createdAt: new Date(2020, 0, 1, 1, 10),
  },
  {
    ...defaultRecievedChatMessage,
    id: `${idPrefix}2`,
    text: "I meant hang",
    createdAt: new Date(2020, 0, 1, 1, 11),
  },
  {
    ...defaultRecievedChatMessage,
    id: `${idPrefix}3`,
    text: "Duck, auto-cucumber",
    createdAt: new Date(2020, 0, 1, 1, 13),
  },
  {
    ...defaulSentChatMessage,
    id: `${idPrefix}4`,
    text: "What?",
    createdAt: new Date(2020, 0, 1, 1, 23),
  },
  {
    id: `${idPrefix}5`,
    text: "God donut.",
    ...defaultRecievedChatMessage,
    createdAt: new Date(2020, 0, 1, 1, 25),
  },
  {
    ...defaultRecievedChatMessage,
    id: `${idPrefix}6`,
    text: "How the duck do I turn this off?",
    createdAt: new Date(2020, 0, 1, 1, 26),
  },
  {
    ...defaulSentChatMessage,
    id: `${idPrefix}7`,
    text: ":))",
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
  },
];

const commonProps: React.ComponentProps<typeof ChatPage> = {
  searchState: "chat",
  onSubmit: action("onSubmit"),
  onSearchButtonClick: action("onSearchButtonClick"),
  onSearchInput: action("onSearchInput"),
  onChangeCurrentSearchClick: () => action("onChangeCurrentSearchClick"),
  chatMessages: getChatMessages("1"),
  currentSearchResult: 0,
  searchQuery: "",
};

export const withDefaultChat = (): React.ReactNode => (
  <ChatPage {...commonProps} />
);

export const withTonsOfMessage = (): React.ReactNode => (
  <ChatPage
    {...commonProps}
    chatMessages={[
      ...getChatMessages("1"),
      ...getChatMessages("2"),
      ...getChatMessages("3"),
      ...getChatMessages("4"),
    ]}
  />
);

export const withSearchOpened = (): React.ReactNode => (
  <ChatPage {...commonProps} searchState="search" />
);

export const withSearchLoading = (): React.ReactNode => (
  <ChatPage {...commonProps} searchState="searchLoading" />
);

export const withSearchResults = (): React.ReactNode => (
  <ChatPage
    {...commonProps}
    searchState="searchFound"
    searchResults={[
      {
        id: "1",
        matches: ["foo"],
      },
    ]}
  />
);
