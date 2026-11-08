import { describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { SubNav } from "./SubNav";

describe("SubNav component", () => {
  it("should apply a consumer aria-label to the nav element", () => {
    render(<SubNav aria-label="Product settings">Links</SubNav>);

    expect(
      screen.getByRole("navigation", { name: "Product settings" }),
    ).toBeInTheDocument();
  });
});
