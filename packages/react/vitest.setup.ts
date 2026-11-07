import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

import { cleanup as cleanupAxiom } from "./src/testing";

// @ts-expect-error -- https://github.com/testing-library/react-testing-library/issues/1197
window.jest = {
  advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
};

beforeEach(() => {
  cleanupAxiom();
  vi.useFakeTimers({
    shouldAdvanceTime: true,
  });
});

afterEach(() => {
  cleanup();
});
