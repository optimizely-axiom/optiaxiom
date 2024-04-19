import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

// @ts-expect-error -- https://github.com/testing-library/react-testing-library/issues/1197
window.jest = {
  advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
