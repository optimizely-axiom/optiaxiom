import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const customRender = (...args: Parameters<typeof render>) => ({
  ...render(...args),
  user: userEvent.setup({
    advanceTimers: vi.advanceTimersByTime.bind(vi),
  }),
});

export const waitForTransitionEnd = async (
  element: HTMLElement,
  callback: () => Promise<void> | void,
) => {
  const promise = new Promise<void>((resolve) => {
    let resolved = false;
    element.addEventListener("transitionend", () => {
      if (resolved) {
        return;
      }

      resolve();
      resolved = true;
    });
  });
  await callback();
  await promise;
};

export const withinShadowRoot = (element: HTMLElement) =>
  within(element.shadowRoot as unknown as HTMLElement);

export * from "@testing-library/react";
export { customRender as render };
