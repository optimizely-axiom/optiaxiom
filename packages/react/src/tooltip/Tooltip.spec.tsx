import { describe, expect, it } from "vitest";

import { render, screen, waitForElementToBeRemoved } from "../../vitest.rtl";
import { Tooltip } from "./Tooltip";

describe("Tooltip component", () => {
  function setup(overrides = {}) {
    const props = {
      children: <button>Tooltip Target</button>,
      content: "Tooltip Content",
      ...overrides,
    };
    const element = (
      <div>
        <Tooltip {...props} />
        <div>Outside Content</div>
      </div>
    );

    return render(element);
  }

  it("should render properly", () => {
    setup();

    expect(screen.getByText("Outside Content")).toBeInTheDocument();
    expect(screen.getByText("Tooltip Target")).toBeInTheDocument();
    expect(screen.queryByText("Tooltip Content")).not.toBeInTheDocument();
  });

  it("should render tooltip on hover", async () => {
    const { user } = setup();

    await user.hover(screen.getByText("Tooltip Target"));
    expect(
      await screen.findByRole("tooltip", { name: "Tooltip Content" }),
    ).toBeInTheDocument();

    await user.click(screen.getByText("Outside Content"));
    // manually trigger css event since RTL user event simulations cannot trigger them
    screen
      .getByRole("tooltip")
      .dispatchEvent(new Event("animationend", { bubbles: true }));
    await waitForElementToBeRemoved(
      screen.queryByRole("tooltip", { name: "Tooltip Content" }),
    );
  });
});
