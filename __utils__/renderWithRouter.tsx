import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { render, RenderResult, RenderOptions } from "./render";

interface RenderWithRouterReturn extends RenderResult {
  history: MemoryHistory;
}

const renderWithRouter = (
  ui: React.ReactElement,
  routerOptions: {
    route?: string;
  } = {
    route: "/",
  },
  options?: Omit<RenderOptions, "wrapper">
): RenderWithRouterReturn => {
  const history = createMemoryHistory({
    initialEntries: [routerOptions.route],
  });
  return {
    ...render(<Router history={history}>{ui}</Router>, options),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
};

export * from "@testing-library/react";

export { renderWithRouter as render };
