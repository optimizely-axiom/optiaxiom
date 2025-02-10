import type { ComponentPropsWithoutRef } from "react";

import { describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Link } from "./Link";

function CustomLink(props: ComponentPropsWithoutRef<"a">) {
  return (
    <a href="/sample" {...props}>
      Sample link
    </a>
  );
}

describe("Link component", () => {
  it("should handle href when using asChild composition", async () => {
    render(
      <Link asChild>
        <CustomLink />
      </Link>,
    );
    expect(screen.getByText("Sample link")).toHaveAttribute("href", "/sample");
  });
});
