// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Tooltip } from "@optiaxiom/web-components/Tooltip";
import { describe, expect, it } from "vitest";

import { render, screen, waitForElementToBeRemoved } from "../vitest.rtl";

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

  it("should render properly", async () => {
    setup();

    expect(screen.getByText("Tooltip Target")).toBeInTheDocument();
    expect(screen.queryByText("Tooltip Content")).not.toBeInTheDocument();
  });

  it.skip("should render tooltip on hover", async () => {
    const { user } = setup();

    await user.hover(screen.getByText("Tooltip Target"));
    expect(
      await screen.findByRole("tooltip", { name: "Tooltip Content" }),
    ).toBeInTheDocument();

    await user.click(screen.getByText("Outside Content"));
    await waitForElementToBeRemoved(
      screen.queryByRole("tooltip", { name: "Tooltip Content" }),
    );
  });

  it("should render tooltip styles", async () => {
    const { user } = setup();

    await user.hover(screen.getByText("Tooltip Target"));
    expect((await screen.findAllByText("Tooltip Content"))[0]).toHaveStyle({
      color: "#fff",
    });
  });
});
