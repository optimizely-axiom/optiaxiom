import { tokens } from "@optiaxiom/globals";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from "@optiaxiom/web-components/Button";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Box } from "@optiaxiom/web-components/Box";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import {
  render,
  screen,
  waitForTransitionEnd,
  withinShadowRoot,
} from "../vitest.rtl";

describe("Box component", () => {
  function setup() {
    return render(<TestComponent />);
  }

  function TestComponent() {
    const [preset, setPreset] = useState<"default" | "primary">("default");

    return (
      <Box p="16">
        This is a box
        <Button
          appearance={preset}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={(node) => {
            node?.addEventListener("click", () => setPreset("primary"));
          }}
        >
          Click
        </Button>
      </Box>
    );
  }

  it("should render properly", async () => {
    setup();
    expect(
      withinShadowRoot(screen.getByText("Click")).getByRole("button"),
    ).toBeInTheDocument();
  });

  it("should handle attribute updates", async () => {
    const { user } = setup();

    await document.fonts.load("1rem InterVariable");
    expect(
      withinShadowRoot(screen.getByText("Click")).getByRole("button"),
    ).toHaveStyle({
      "background-color": "rgb(255, 255, 255)",
      color: tokens.colors["fg.default"],
    });
    await waitForTransitionEnd(
      withinShadowRoot(screen.getByText("Click")).getByRole("button"),
      async () => await user.click(screen.getByText("Click")),
    );
    expect(
      withinShadowRoot(screen.getByText("Click")).getByRole("button"),
    ).toHaveStyle({
      "background-color": "rgb(0, 55, 255)",
      color: "#fff",
    });
  });
});
