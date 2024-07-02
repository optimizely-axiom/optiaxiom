// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from "@optiaxiom/web-components/Button";
import { describe, expect, it } from "vitest";

import { render, screen, withinShadowRoot } from "../vitest.rtl";

describe("Button component", () => {
  function setup(overrides = {}) {
    return render(
      <Button appearance="primary" {...overrides}>
        Primary
      </Button>,
    );
  }

  it("should render properly", async () => {
    setup();
    expect(
      withinShadowRoot(screen.getByText("Primary")).getByText("Primary"),
    ).toBeInTheDocument();
  });

  it("should render styles", async () => {
    setup();
    expect(
      withinShadowRoot(screen.getByText("Primary")).getByRole("button"),
    ).toHaveStyle({
      "background-color": "rgb(0, 55, 255)",
      color: "#fff",
    });
    await document.fonts.load("1rem InterVariable");
  });
});
