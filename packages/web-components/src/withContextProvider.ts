import { type ComponentType, createElement } from "react";

/**
 * Wrap an existing component with custom preact context.
 */
export const withContextProvider = <P extends { context?: unknown }>(
  Component: ComponentType<P>,
  { context, ref }: { context: unknown; ref: unknown },
) => {
  return function ContextProvider(
    this: { getChildContext: () => unknown },
    rawProps: P,
  ) {
    this.getChildContext = () => context;

    const props = Object.assign({ ref }, rawProps);
    delete props.context;
    return createElement<P>(Component, props);
  };
};
