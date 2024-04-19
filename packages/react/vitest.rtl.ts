import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const customRender = (...args: Parameters<typeof render>) => ({
  ...render(...args),
  user: userEvent.setup({
    advanceTimers: vi.advanceTimersByTime,
  }),
});

export * from "@testing-library/react";
export { customRender as render };
