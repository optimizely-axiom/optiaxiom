import * as _ from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { AxiomProvider } from "./src";

const customRender = (...args: Parameters<typeof render>) => ({
  ...render(args[0], {
    wrapper: AxiomProvider,
    ...args[1],
  }),
  user: userEvent.setup({
    advanceTimers: vi.advanceTimersByTime,
  }),
});

export * from "@testing-library/react";
export { customRender as render };
