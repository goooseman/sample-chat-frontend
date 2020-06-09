import React from "react";

export type ContextHOC<Context extends object> = <P extends Context>(
  Component: React.ComponentType<P>
) => React.ComponentType<Omit<P, keyof Context> & Partial<Context>>;

const createContextHOC = <Context extends object>(
  Consumer: React.Consumer<Context>
) => {
  const withContext = <P extends Context, DP extends object>(
    Component: React.ComponentType<P> & { defaultProps?: DP }
  ) => {
    return class WithContextHOC extends React.Component<
      Omit<P, keyof Context> & Partial<Context>
    > {
      public render() {
        return <Consumer>{this.renderComponent}</Consumer>;
      }

      private renderComponent = (ctx: Context) => {
        const newProps = { ...ctx, ...this.props };
        return <Component {...(newProps as P)} />;
      };
    };
  };

  return withContext;
};

export default createContextHOC;
