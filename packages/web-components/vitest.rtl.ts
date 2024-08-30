// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AxiomProvider } from "@optiaxiom/web-components/AxiomProvider";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { vi } from "vitest";

const GlobalTestWrapper = ({ children }: { children?: React.ReactNode }) => {
  return createElement(AxiomProvider, undefined, children);
};

const customRender = (...args: Parameters<typeof render>) => ({
  ...render(args[0], {
    wrapper: GlobalTestWrapper,
    ...args[1],
  }),
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
