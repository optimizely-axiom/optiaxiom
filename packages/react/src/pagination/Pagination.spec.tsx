import { describe, expect, it, vi } from "vitest";

import { render } from "../../vitest.rtl";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("clears its animation timer when it unmounts", () => {
    const { unmount } = render(<Pagination total={30} />);
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
