import { describe, expect, it, vi } from "vitest";

import { render, screen, waitFor, within } from "../../vitest.rtl";
import { Button } from "../button";
import { createToaster, toaster, ToastProvider } from "./index";

describe("Toast", () => {
  describe("with the default provider", () => {
    function setup() {
      return render(
        <Button onClick={() => toaster.create("Changes saved")}>Save</Button>,
      );
    }

    it("shows a toast and closes it after its duration", async () => {
      const { user } = setup();

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
      const { user } = setup();

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

    it("can unmount while a toast is still showing", async () => {
      const { unmount, user } = setup();

      await user.click(screen.getByRole("button", { name: "Save" }));
      await within(
        screen.getByRole("region", { name: /notifications/i }),
      ).findByText("Changes saved");

      // A timer left running would fire after the test environment is torn down.
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe("with an action", () => {
    function setup() {
      const onUndo = vi.fn();
      return {
        ...render(
          <Button
            onClick={() =>
              toaster.create("Task deleted", {
                action: "Undo",
                onAction: onUndo,
              })
            }
          >
            Delete
          </Button>,
        ),
        onUndo,
      };
    }

    it("runs the action and closes the toast", async () => {
      const { onUndo, user } = setup();

      await user.click(screen.getByRole("button", { name: "Delete" }));
      await user.click(
        await within(
          screen.getByRole("region", { name: /notifications/i }),
        ).findByRole("button", { name: "Undo" }),
      );

      expect(onUndo).toHaveBeenCalledTimes(1);
      await waitFor(() =>
        expect(
          screen.queryByRole("region", { name: /notifications/i }),
        ).not.toBeInTheDocument(),
      );
    });

    it("stays open for 1.5 times the provider duration", async () => {
      const { user } = setup();

      await user.click(screen.getByRole("button", { name: "Delete" }));
      const notifications = within(
        screen.getByRole("region", { name: /notifications/i }),
      );
      await notifications.findByText("Task deleted");

      await vi.advanceTimersByTimeAsync(7000);
      expect(notifications.getByText("Task deleted")).toBeVisible();

      await vi.advanceTimersByTimeAsync(500);
      await waitFor(() =>
        expect(
          screen.queryByRole("region", { name: /notifications/i }),
        ).not.toBeInTheDocument(),
      );
    });
  });

  describe("inside a custom container", () => {
    function setup() {
      const host = document.body.appendChild(document.createElement("div"));
      const toaster = createToaster();

      return {
        ...render(<ToastProvider container={host} toaster={toaster} />, {
          wrapper: undefined,
        }),
        host,
        toaster,
      };
    }

    it("announces toasts inside the container", async () => {
      const { host, toaster } = setup();

      toaster.create("Changes saved");
      await waitFor(() =>
        expect(within(host).getByRole("status")).toHaveTextContent(
          "Changes saved",
        ),
      );
      host.remove();
    });
  });
});
