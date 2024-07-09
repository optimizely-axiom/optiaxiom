// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from "@optiaxiom/web-components/Button";
import { describe, expect, it } from "vitest";

import { render, screen, withinShadowRoot } from "../vitest.rtl";

describe("Component slots", () => {
  function setup(overrides = {}) {
    return render(
      <Button preset="primary" {...overrides}>
        <i slot="rightSection">icon</i>
        Primary
      </Button>,
    );
  }

  it("should render properly", async () => {
    setup();
    expect(
      withinShadowRoot(screen.getByText("Primary")).getByRole("button"),
    ).toHaveTextContent("Primaryicon");
  });
});
