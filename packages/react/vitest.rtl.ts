import * as _ from "@testing-library/dom";
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

/**
 * There's some bug in vitest <3.1.2 that causes render from
 * "@testing-library/react" to overwrite our custom render.
 * So we explicitly list out the re-exported modules.
 */
export { screen, waitFor } from "@testing-library/react";
export { customRender as render };
