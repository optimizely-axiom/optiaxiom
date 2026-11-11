import type { ComponentPropsWithoutRef } from "react";

import { describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "../../vitest.rtl";
import { Field } from "../field";
import { InlineInput } from "./InlineInput";

describe("InlineInput component", () => {
  describe("outside a Field", () => {
    function setup(
      overrides: Partial<ComponentPropsWithoutRef<typeof InlineInput>> = {},
    ) {
      return render(<InlineInput label="Title" {...overrides} />);
    }

    it("names the textbox by its label", () => {
      setup({ defaultValue: "Write release notes" });

      expect(screen.getByRole("textbox", { name: "Title" })).toHaveTextContent(
        "Write release notes",
      );
    });

    it("reports the text written into it", () => {
      const onValueChange = vi.fn();
      setup({ onValueChange });

      // Not user.type: user-event only types into contenteditable="true", and
      // InlineInput is contenteditable="plaintext-only".
      const textbox = screen.getByRole("textbox", { name: "Title" });
      textbox.textContent = "Write release notes";
      // oxlint-disable-next-line testing-library/prefer-user-event
      fireEvent.input(textbox);

      expect(onValueChange).toHaveBeenCalledWith("Write release notes");
    });
  });

  describe("inside a Field", () => {
    function setup(overrides: ComponentPropsWithoutRef<typeof Field> = {}) {
      return render(
        <Field label="Task title" {...overrides}>
          <InlineInput label="Title" />
        </Field>,
      );
    }

    it("takes its name, description and error from the Field", () => {
      setup({
        description: "Shown in the task list.",
        error: "Title is required.",
      });

      const textbox = screen.getByRole("textbox", { name: "Task title" });
      expect(textbox).toBeInvalid();
      expect(textbox).toHaveAccessibleDescription(
        "Title is required. Shown in the task list.",
      );
    });

    it("focuses the textbox when the Field label is clicked", async () => {
      const { user } = setup();

      await user.click(screen.getByText("Task title"));

      expect(screen.getByRole("textbox", { name: "Task title" })).toHaveFocus();
    });
  });
});
