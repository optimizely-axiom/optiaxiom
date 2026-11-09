import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Field } from "../field";
import { Select } from "./Select";
import { SelectContent } from "./SelectContent";
import { SelectTrigger } from "./SelectTrigger";

describe("Select component", () => {
  function setup(overrides = {}) {
    const onSubmit = vi.fn();
    const props = {
      onValueChange: vi.fn(),
      options: [
        { label: "English", value: "en" },
        { label: "French", value: "fr" },
        { label: "German", value: "de" },
      ],
      ...overrides,
    };

    return {
      ...render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(Object.fromEntries(new FormData(event.currentTarget)));
          }}
        >
          <Field label="Language">
            <Select name="language" {...props}>
              <SelectTrigger placeholder="Select a language" />
              <SelectContent />
            </Select>
          </Field>
          <button type="submit">Save</button>
        </form>,
      ),
      onSubmit,
      onValueChange: props.onValueChange,
    };
  }

  it("names the trigger by its aria-label and value outside a Field", () => {
    render(
      <Select
        defaultValue="15"
        options={["5", "15", "30"].map((value) => ({ label: value, value }))}
      >
        <SelectTrigger aria-label="Minutes" />
      </Select>,
    );

    expect(
      screen.getByRole("combobox", { name: "Minutes 15" }),
    ).toBeInTheDocument();
  });

  it("should select the clicked option and submit it with its form", async () => {
    const { onSubmit, onValueChange, user } = setup();

    await user.click(
      screen.getByRole("combobox", { name: "Language Select a language" }),
    );
    await user.click(await screen.findByRole("option", { name: "French" }));

    expect(onValueChange).toHaveBeenCalledWith("fr");
    expect(
      screen.getByRole("combobox", { name: "Language French" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onSubmit).toHaveBeenCalledWith({ language: "fr" });
  });

  it("ignores option selection after an open Select becomes disabled", async () => {
    const onValueChange = vi.fn();
    const options = [
      { label: "English", value: "en" },
      { label: "French", value: "fr" },
    ];
    const onOpenChange = vi.fn();
    const renderSelect = (open: boolean, disabled: boolean) => (
      <Select
        disabled={disabled}
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
        open={open}
        options={options}
        value="en"
      >
        <SelectTrigger aria-label="Language" />
        <SelectContent aria-label="Languages" />
      </Select>
    );

    const { rerender, user } = render(renderSelect(false, false));
    const trigger = screen.getByRole("combobox", { name: "Language English" });
    await user.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    rerender(renderSelect(true, false));
    await screen.findByRole("option", { name: "French" });

    rerender(renderSelect(true, true));
    expect(trigger).toBeDisabled();
    await user.click(screen.getByRole("option", { name: "French" }));

    expect(onValueChange).not.toHaveBeenCalled();
    expect(trigger).toHaveTextContent("English");
  });

  it("should select an option with the keyboard", async () => {
    const { onValueChange, user } = setup({ defaultValue: "en" });

    await user.tab();
    await user.keyboard("{Enter}");
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("fr");
  });
});
