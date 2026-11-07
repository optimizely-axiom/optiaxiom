import { describe, expect, it, vi } from "vitest";

import { render, screen, waitFor, within } from "../../vitest.rtl";
import { Button } from "../button";
import { createToaster, toaster, ToastProvider } from "./index";

async function findToast() {
  const region = await screen.findByRole("region", { name: /notifications/i });
  const toast = await within(region).findByRole("listitem");
  // The viewport accepts clicks one render after the toast appears.
  await waitFor(() =>
    expect(region).not.toHaveStyle({ pointerEvents: "none" }),
  );
  return toast;
}

function SaveButton() {
  return <Button onClick={() => toaster.create("Changes saved")}>Save</Button>;
}

describe("Toast", () => {
  it("shows a toast and closes it after its duration", async () => {
    const { user } = render(<SaveButton />);

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(await findToast()).toHaveTextContent("Changes saved");

    vi.advanceTimersByTime(5000);
    await waitFor(() =>
      expect(screen.queryByRole("listitem")).not.toBeInTheDocument(),
    );
  });

  it("closes a toast from its close button", async () => {
    const { user } = render(<SaveButton />);

    await user.click(screen.getByRole("button", { name: "Save" }));
    const toast = await findToast();

    await user.click(within(toast).getByRole("button", { name: "close" }));
    await waitFor(() =>
      expect(screen.queryByRole("listitem")).not.toBeInTheDocument(),
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
    await findToast();

    // A timer left running would fire after the test environment is torn down.
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
