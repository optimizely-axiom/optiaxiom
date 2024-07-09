// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from "@optiaxiom/web-components/Button";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Paper } from "@optiaxiom/web-components/Paper";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import {
  render,
  screen,
  waitForTransitionEnd,
  withinShadowRoot,
} from "../vitest.rtl";

describe("Paper component", () => {
  function setup() {
    return render(<TestComponent />);
  }

  function TestComponent() {
    const [preset, setPreset] = useState<"default" | "primary">("default");

    return (
      <Paper p="md">
        This is a paper
        <Button
          preset={preset}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={(node) => {
            node?.addEventListener("click", () => setPreset("primary"));
          }}
        >
          Click
        </Button>
      </Paper>
    );
  }

  it("should render properly", async () => {
    setup();
    expect(
      withinShadowRoot(screen.getByText("This is a paper")).getByText(
        "This is a paper",
      ),
    ).toBeInTheDocument();
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
      "background-color": "rgba(0, 0, 0, 0)",
      color: "rgb(70, 77, 97)",
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
