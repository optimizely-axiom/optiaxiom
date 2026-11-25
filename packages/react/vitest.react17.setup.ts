import { configure } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

/**
 * What Testing Library 13+ configures for React 18, which Testing Library 12
 * leaves out. With fake timers, `waitFor` advances them instead of waiting, so
 * React 17 runs its effects only when an `act` around an advance ends: one
 * `act` around the whole of `waitFor` holds them until it times out.
 */
configure({
  asyncWrapper: (cb) => cb(),
  unstable_advanceTimersWrapper: (cb) => act(cb),
});
