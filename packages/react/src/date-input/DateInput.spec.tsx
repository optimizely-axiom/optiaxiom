import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Field } from "../field";
import { DateInput } from "./DateInput";

describe("DateInput component", () => {
  function setup() {
    const onSubmit = vi.fn();

    return {
      ...render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(Object.fromEntries(new FormData(event.currentTarget)));
          }}
        >
          <Field label="Due date">
            <DateInput name="due" placeholder="2025-01-01" />
          </Field>
          <button type="submit">Save</button>
        </form>,
      ),
      onSubmit,
    };
  }

  it("should submit the typed date with its form", async () => {
    const { onSubmit, user } = setup();

    await user.type(screen.getByLabelText("Due date"), "2025-01-15");
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onSubmit).toHaveBeenCalledWith({ due: "2025-01-15" });
  });

  it("should fill in the date picked from the calendar", async () => {
    const { user } = setup();

    await user.click(screen.getByRole("img", { name: "Show date picker" }));
    await user.click(
      await screen.findByRole("button", { name: /January 15th, 2025/ }),
    );

    expect(screen.getByLabelText("Due date")).toHaveValue("2025-01-15");
  });
});
