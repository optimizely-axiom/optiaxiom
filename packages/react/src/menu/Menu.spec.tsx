import { describe, expect, it, vi } from "vitest";

import { render, screen, waitFor, within } from "../../vitest.rtl";
import { Menu } from "./Menu";
import { MenuContent } from "./MenuContent";
import { MenuTrigger } from "./MenuTrigger";

describe("Menu component", () => {
  function setup(overrides = {}) {
    const props = {
      options: [
        { execute: vi.fn(), label: "Edit" },
        { execute: vi.fn(), label: "Duplicate" },
        { execute: vi.fn(), label: "Delete" },
      ],
      ...overrides,
    };

    return {
      ...render(
        <Menu {...props}>
          <MenuTrigger>Actions</MenuTrigger>
          <MenuContent />
        </Menu>,
      ),
      options: props.options,
    };
  }

  it("should run the clicked option and close", async () => {
    const { options, user } = setup();

    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.click(await screen.findByRole("option", { name: "Delete" }));

    expect(options[2].execute).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(
        screen.queryByRole("option", { name: "Delete" }),
      ).not.toBeInTheDocument(),
    );
  });

  it("should run the highlighted option with the keyboard", async () => {
    const { options, user } = setup();

    await user.tab();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveFocus());
    await user.keyboard("{ArrowDown}{Enter}");

    expect(options[1].execute).toHaveBeenCalledTimes(1);
  });

  it("should filter options as the user types", async () => {
    const { user } = setup({ inputVisible: "always" });

    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.type(await screen.findByRole("combobox"), "dup");

    expect(screen.getByRole("option", { name: "Duplicate" })).toBeVisible();
    expect(
      screen.queryByRole("option", { name: "Edit" }),
    ).not.toBeInTheDocument();
  });

  it("should open sub-options on hover", async () => {
    const { user } = setup({
      options: [
        { label: "Edit" },
        {
          label: "Share",
          subOptions: [{ label: "Email" }, { label: "Copy link" }],
        },
      ],
    });

    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.hover(await screen.findByRole("option", { name: "Share" }));

    expect(
      await screen.findByRole("option", { name: "Copy link" }),
    ).toBeVisible();
  });

  it("should filter sub-options as the user types", async () => {
    const { user } = setup({
      options: [
        { label: "Edit" },
        {
          label: "Share",
          subOptions: [{ label: "Email" }, { label: "Copy link" }],
          subOptionsInputVisible: true,
        },
      ],
    });

    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.hover(await screen.findByRole("option", { name: "Share" }));
    const submenu = await screen.findByRole("dialog", {
      name: "Share Submenu",
    });
    await user.type(within(submenu).getByRole("combobox"), "copy");

    expect(
      within(submenu).getByRole("option", { name: "Copy link" }),
    ).toBeVisible();
    expect(
      within(submenu).queryByRole("option", { name: "Email" }),
    ).not.toBeInTheDocument();
  });
});
