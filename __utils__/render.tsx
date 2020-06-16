import { render, RenderOptions, RenderResult } from "@testing-library/react";
import React from "react";
import { TargemStatefulProvider } from "react-targem";
import "@testing-library/jest-dom";

export const BlankWrapper: React.StatelessComponent<{}> = (props: {
  children?: React.ReactNode;
}) => <>{props.children}</>;

const AllTheProviders = (Wrapper: React.ComponentType = BlankWrapper) => ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <Wrapper>
      <TargemStatefulProvider translations={{}}>
        {/** StrictMode is useful for `this.setState` functions to be called twice and to prevent side-effects */}
        <React.StrictMode>{children}</React.StrictMode>
      </TargemStatefulProvider>
    </Wrapper>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions
): RenderResult => {
  return render(ui, { ...options, wrapper: AllTheProviders(options?.wrapper) });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
