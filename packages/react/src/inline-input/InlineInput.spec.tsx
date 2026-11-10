import { describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "../../vitest.rtl";
import { Field } from "../field";
import { InlineInput } from "./InlineInput";

describe("InlineInput component", () => {
  it("names the textbox by its label outside a Field", () => {
    render(<InlineInput defaultValue="Write release notes" label="Title" />);

    expect(screen.getByRole("textbox", { name: "Title" })).toHaveTextContent(
      "Write release notes",
    );
  });

  it("reports the text written into it", () => {
    const onValueChange = vi.fn();
    render(<InlineInput label="Title" onValueChange={onValueChange} />);

    // Not user.type: user-event only types into contenteditable="true", and
    // InlineInput is contenteditable="plaintext-only".
    const textbox = screen.getByRole("textbox", { name: "Title" });
    textbox.textContent = "Write release notes";
    // oxlint-disable-next-line testing-library/prefer-user-event
    fireEvent.input(textbox);

    expect(onValueChange).toHaveBeenCalledWith("Write release notes");
  });

  it("takes its name, description and error from the Field", () => {
    render(
      <Field
        description="Shown in the task list."
        error="Title is required."
        label="Task title"
      >
        <InlineInput label="Title" />
      </Field>,
    );

    const textbox = screen.getByRole("textbox", { name: "Task title" });
    expect(textbox).toBeInvalid();
    expect(textbox).toHaveAccessibleDescription(
      "Title is required. Shown in the task list.",
    );
  });

  it("focuses the textbox when the Field label is clicked", async () => {
    const { user } = render(
      <Field label="Task title">
        <InlineInput label="Title" />
      </Field>,
    );

    await user.click(screen.getByText("Task title"));

    expect(screen.getByRole("textbox", { name: "Task title" })).toHaveFocus();
  });
});
