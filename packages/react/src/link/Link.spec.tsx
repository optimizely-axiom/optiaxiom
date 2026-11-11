import type { ComponentPropsWithoutRef } from "react";

import { describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Link } from "./Link";

describe("Link component", () => {
  function setup() {
    function CustomLink(props: ComponentPropsWithoutRef<"a">) {
      return (
        <a href="/sample" {...props}>
          Sample link
        </a>
      );
    }

    return render(
      <Link asChild>
        <CustomLink />
      </Link>,
    );
  }

  it("should handle href when using asChild composition", async () => {
    setup();
    expect(screen.getByText("Sample link")).toHaveAttribute("href", "/sample");
  });
});
