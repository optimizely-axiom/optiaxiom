import { describe, expect, it, vi } from "vitest";

import { render, screen, waitFor } from "../../vitest.rtl";
import { Button } from "../button";
import { DialogContent, DialogFooter, DialogHeader } from "../dialog";
import { dialogkit } from "./dialogkit";
import { useDialogKit } from "./useDialogKit";

describe("dialogkit", () => {
  function setup() {
    const onResult = vi.fn();
    return {
      ...render(
        <Button
          onClick={async () =>
            onResult(
              await dialogkit.confirm({
                action: "Yes, delete",
                body: "The comment and all replies will be deleted.",
                header: "Delete comment?",
              }),
            )
          }
        >
          Delete comment
        </Button>,
      ),
      onResult,
    };
  }

  it("resolves confirm() with true when the user confirms", async () => {
    const { onResult, user } = setup();

    await user.click(screen.getByRole("button", { name: "Delete comment" }));
    await screen.findByRole("alertdialog", { name: "Delete comment?" });
    await user.click(screen.getByRole("button", { name: "Yes, delete" }));

    await waitFor(() => expect(onResult).toHaveBeenCalledWith(true));
  });

  it("resolves confirm() with false when the user cancels", async () => {
    const { onResult, user } = setup();

    await user.click(screen.getByRole("button", { name: "Delete comment" }));
    await screen.findByRole("alertdialog", { name: "Delete comment?" });
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() => expect(onResult).toHaveBeenCalledWith(false));
  });

  it("closes a created dialog from inside with remove()", async () => {
    function DoneDialog() {
      const { id } = useDialogKit();
      return (
        <DialogContent>
          <DialogHeader>Export ready</DialogHeader>
          <DialogFooter>
            <Button onClick={() => dialogkit.remove(id)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      );
    }
    const { user } = render(
      <Button onClick={() => dialogkit.create(<DoneDialog />)}>Export</Button>,
    );

    await user.click(screen.getByRole("button", { name: "Export" }));
    await screen.findByRole("dialog", { name: "Export ready" });
    await user.click(screen.getByRole("button", { name: "Done" }));

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
