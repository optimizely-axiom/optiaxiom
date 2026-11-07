import { describe, expect, it, vi } from "vitest";

import { render, screen, waitFor, within } from "../../vitest.rtl";
import { Button } from "../button";
import { createToaster, toaster, ToastProvider } from "./index";

function SaveButton() {
  return <Button onClick={() => toaster.create("Changes saved")}>Save</Button>;
}

describe("Toast", () => {
  it("shows a toast and closes it after its duration", async () => {
    const { user } = render(<SaveButton />);

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(
      await within(
        screen.getByRole("region", { name: /notifications/i }),
      ).findByText("Changes saved"),
    ).toBeVisible();

    vi.advanceTimersByTime(5000);
    await waitFor(() =>
      expect(
        screen.queryByRole("region", { name: /notifications/i }),
      ).not.toBeInTheDocument(),
    );
  });

  it("closes a toast from its close button", async () => {
    const { user } = render(<SaveButton />);

    await user.click(screen.getByRole("button", { name: "Save" }));
    const notifications = within(
      screen.getByRole("region", { name: /notifications/i }),
    );
    await notifications.findByText("Changes saved");

    await user.click(notifications.getByRole("button", { name: "close" }));
    await waitFor(() =>
      expect(
        screen.queryByRole("region", { name: /notifications/i }),
      ).not.toBeInTheDocument(),
    );
  });

  it("announces toasts inside a custom container", async () => {
    const container = document.body.appendChild(document.createElement("div"));
    const toaster = createToaster();
    render(<ToastProvider container={container} toaster={toaster} />, {
      wrapper: undefined,
    });

    toaster.create("Changes saved");
    await waitFor(() =>
      expect(within(container).getByRole("status")).toHaveTextContent(
        "Changes saved",
      ),
    );
    container.remove();
  });

  it("can unmount while a toast is still showing", async () => {
    const { unmount, user } = render(<SaveButton />);

    await user.click(screen.getByRole("button", { name: "Save" }));
    await within(
      screen.getByRole("region", { name: /notifications/i }),
    ).findByText("Changes saved");

    // A timer left running would fire after the test environment is torn down.
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
