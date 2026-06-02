import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { RichTextEditor } from "./RichTextEditor";

describe("RichTextEditor component", () => {
  it("should render the editor with initial value", async () => {
    render(<RichTextEditor defaultValue="<p>Hello world</p>" />);
    expect(await screen.findByText("Hello world")).toBeInTheDocument();
  });

  it("should render the toolbar when not read-only", async () => {
    render(<RichTextEditor defaultValue="<p>Hi</p>" />);
    expect(
      await screen.findByRole("button", { name: "Bold" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Italic" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Link" })).toBeInTheDocument();
  });

  it("should hide the toolbar when read-only", async () => {
    render(<RichTextEditor defaultValue="<p>Locked</p>" readOnly />);
    expect(await screen.findByText("Locked")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Bold" }),
    ).not.toBeInTheDocument();
  });

  it("should toggle bold when the bold button is clicked", async () => {
    const onValueChange = vi.fn();
    const { user } = render(
      <RichTextEditor defaultValue="<p>x</p>" onValueChange={onValueChange} />,
    );
    const editor = screen.getByRole("textbox");
    await user.click(editor);
    await user.keyboard("{Control>}a{/Control}");
    await user.click(await screen.findByRole("button", { name: "Bold" }));
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.lastCall?.[0]).toContain("<strong>");
  });
});
