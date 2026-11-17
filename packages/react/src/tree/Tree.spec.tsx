import { type ComponentPropsWithoutRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen, waitFor } from "../../vitest.rtl";
import { Tree } from "./Tree";

describe("Tree component", () => {
  function setup(
    overrides: Partial<ComponentPropsWithoutRef<typeof Tree>> = {},
  ) {
    const props = {
      onValueChange: vi.fn(),
      options: [
        {
          children: [
            { label: "Blog", value: "blog" },
            { label: "Contact", value: "contact" },
          ],
          label: "Home",
          value: "home",
        },
        { label: "Archive", value: "archive" },
      ],
      ...overrides,
    };

    return {
      ...render(<Tree aria-label="Pages" {...props} />),
      onValueChange: props.onValueChange,
    };
  }

  it("should expand, select and collapse items with the keyboard", async () => {
    const { onValueChange, user } = setup();

    await user.tab();
    expect(screen.getByRole("treeitem", { name: "Home" })).toHaveFocus();

    await user.keyboard("{ArrowRight}{ArrowDown}{Enter}");
    expect(screen.getByRole("treeitem", { name: "Blog" })).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith(["blog"]);

    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(screen.getByRole("treeitem", { name: "Home" })).toHaveFocus();
    await waitFor(() =>
      expect(
        screen.queryByRole("treeitem", { name: "Blog" }),
      ).not.toBeInTheDocument(),
    );
  });

  it("should load children when an item first expands", async () => {
    const { user } = setup({
      options: [
        {
          children: async () => [{ label: "Blog", value: "blog" }],
          label: "Home",
          value: "home",
        },
      ],
    });

    await user.tab();
    await user.keyboard("{ArrowRight}");

    expect(
      await screen.findByRole("treeitem", { name: "Blog" }),
    ).toBeInTheDocument();
  });

  it("should rename an item in place from its context menu", async () => {
    const onLabelChange = vi.fn();
    const { user } = setup({
      onLabelChange,
      options: [
        {
          actions: ({ rename }) => [{ execute: rename, label: "Rename" }],
          label: "Blog",
          value: "blog",
        },
      ],
    });

    await user.click(screen.getByRole("treeitem", { name: "Blog" }));
    await user.keyboard("{Shift>}{F10}{/Shift}");
    await user.click(await screen.findByRole("option", { name: "Rename" }));

    // Not user.type: user-event only types into contenteditable="true", and
    // the label field is contenteditable="plaintext-only".
    const field = await screen.findByRole("textbox", { name: "Blog" });
    field.textContent = "News";
    // oxlint-disable-next-line testing-library/prefer-user-event
    fireEvent.input(field);
    await user.keyboard("{Enter}");

    expect(onLabelChange).toHaveBeenCalledWith("blog", "News");
    expect(screen.getByRole("treeitem", { name: "Blog" })).toHaveFocus();
  });
});
