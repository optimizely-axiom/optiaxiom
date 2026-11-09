import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Button } from "./Button";

describe("Button component", () => {
  function setup(overrides = {}) {
    const props = {
      children: "Click Me",
      ...overrides,
    };
    return render(<Button {...props} />);
  }

  it("should render button", async () => {
    setup();
    expect(
      screen.getByRole("button", { name: "Click Me" }),
    ).toBeInTheDocument();
  });

  it("should call onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    const { user } = setup({ onClick: handleClick });
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    await user.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick handler when disabled", async () => {
    const handleClick = vi.fn();
    const { user } = setup({ disabled: true, onClick: handleClick });
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    await user.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should apply correct aria attributes for accessibility", async () => {
    const ariaLabel = "Custom Label";
    setup({ "aria-label": ariaLabel });
    const buttonElement = screen.getByLabelText(ariaLabel);
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render different children text", async () => {
    const customText = "Submit";
    setup({ children: customText });
    expect(
      screen.getByRole("button", { name: customText }),
    ).toBeInTheDocument();
  });

  it("should still call onClick while loading", async () => {
    const handleClick = vi.fn();
    const { user } = setup({ loading: true, onClick: handleClick });

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalled();
  });

  it("should mark the button busy while loading", () => {
    setup({ loading: true });

    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("should support aria-label", async () => {
    setup({ "aria-label": "Aria Label", children: null });

    expect(screen.getByRole("button", { name: "Aria Label" })).toBeVisible();
  });
});
