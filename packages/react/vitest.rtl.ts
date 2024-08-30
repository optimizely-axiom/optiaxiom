import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { vi } from "vitest";

import { AxiomProvider } from "./src";

const GlobalTestWrapper = ({ children }: { children?: React.ReactNode }) => {
  return createElement(AxiomProvider, undefined, children);
};

const customRender = (...args: Parameters<typeof render>) => ({
  ...render(args[0], {
    wrapper: GlobalTestWrapper,
    ...args[1],
  }),
  user: userEvent.setup({
    advanceTimers: vi.advanceTimersByTime,
  }),
});

export * from "@testing-library/react";
export { customRender as render };
