import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { render, RenderResult, RenderOptions, BlankWrapper } from "./render";

interface RenderWithRouterReturn extends RenderResult {
  history: MemoryHistory;
}

const renderWithRouter = (
  ui: React.ReactElement,
  routerOptions: {
    route: string;
  } = {
    route: "/",
  },
  options?: RenderOptions
): RenderWithRouterReturn => {
  const history = createMemoryHistory({
    initialEntries: [routerOptions.route],
  });
  const RouterProvider = (Wrapper: React.ComponentType = BlankWrapper) => ({
    children,
  }: {
    children?: React.ReactNode;
  }) => {
    return (
      <Wrapper>
        <Router history={history}>{children}</Router>
      </Wrapper>
    );
  };

  return {
    ...render(ui, {
      ...options,
      wrapper: RouterProvider(options?.wrapper),
    }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
};

export * from "@testing-library/react";

export { renderWithRouter as render };
