import type { ComponentPropsWithoutRef } from "react";

import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { RichTextEditor } from "./RichTextEditor";

describe("RichTextEditor component", () => {
  function setup(
    overrides: ComponentPropsWithoutRef<typeof RichTextEditor> = {},
  ) {
    return render(<RichTextEditor {...overrides} />);
  }

  it("should render the editor with initial value", async () => {
    setup({ defaultValue: "<p>Hello world</p>" });
    expect(await screen.findByText("Hello world")).toBeInTheDocument();
  });

  it("should render the toolbar when not read-only", async () => {
    setup({ defaultValue: "<p>Hi</p>" });
    expect(
      await screen.findByRole("button", { name: "Bold" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Italic" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Link" })).toBeInTheDocument();
  });

  it("should hide the toolbar when read-only", async () => {
    setup({ defaultValue: "<p>Locked</p>", readOnly: true });
    expect(await screen.findByText("Locked")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Bold" }),
    ).not.toBeInTheDocument();
  });

  it("should toggle bold when the bold button is clicked", async () => {
    const onValueChange = vi.fn();
    const { user } = setup({ defaultValue: "<p>x</p>", onValueChange });
    const editor = screen.getByRole("textbox");
    await user.click(editor);
    await user.keyboard("{Control>}a{/Control}");
    await user.click(await screen.findByRole("button", { name: "Bold" }));
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.lastCall?.[0]).toContain("<strong>");
  });
});
