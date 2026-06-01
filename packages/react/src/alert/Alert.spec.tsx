import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Alert, type AlertProps } from "./Alert";

describe("Alert component", () => {
  function setup(overrides: AlertProps = {}) {
    return render(
      <Alert
        {...{
          children: "Something happened",
          ...overrides,
        }}
      />,
    );
  }

  it("should expose an alert role with its content as the accessible name", () => {
    setup();

    expect(
      screen.getByRole("alert", { name: "Something happened" }),
    ).toBeInTheDocument();
  });

  it("should render the provided children", () => {
    setup({ children: "Your changes were saved" });

    expect(screen.getByText("Your changes were saved")).toBeInTheDocument();
  });

  describe("should render an alert for each intent", () => {
    (["danger", "information", "neutral", "success", "warning"] as const).map(
      (intent) =>
        it(`should render an alert for ${intent} intent`, () => {
          setup({ children: `${intent} message`, intent });
          expect(
            screen.getByRole("alert", { name: `${intent} message` }),
          ).toBeInTheDocument();
        }),
    );
  });

  it("should not render a close button without onDismiss", () => {
    setup();

    expect(
      screen.queryByRole("button", { name: "close" }),
    ).not.toBeInTheDocument();
  });

  it("should render a close button when onDismiss is provided", () => {
    setup({ onDismiss: vi.fn() });

    expect(screen.getByRole("button", { name: "close" })).toBeInTheDocument();
  });

  it("should call onDismiss when the close button is clicked", async () => {
    const onDismiss = vi.fn();
    const { user } = setup({ onDismiss });

    await user.click(screen.getByRole("button", { name: "close" }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
