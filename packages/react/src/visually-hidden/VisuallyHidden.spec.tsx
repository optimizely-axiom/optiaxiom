import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";

import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden", () => {
  it("should set inline position to absolute", () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    act(() => {
      root.render(<VisuallyHidden>Hidden label</VisuallyHidden>);
    });

    expect(container.querySelector("span")?.style.position).toBe("absolute");

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
