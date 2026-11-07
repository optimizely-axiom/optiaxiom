import { describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Field } from "../field";
import { Select } from "./Select";
import { SelectTrigger } from "./SelectTrigger";

const options = ["5", "15", "30"].map((value) => ({ label: value, value }));

describe("Select component", () => {
  it("names the trigger by its aria-label and value outside a Field", () => {
    render(
      <Select defaultValue="15" options={options}>
        <SelectTrigger aria-label="Minutes" />
      </Select>,
    );

    expect(
      screen.getByRole("combobox", { name: "Minutes 15" }),
    ).toBeInTheDocument();
  });

  it("names the trigger by its Field label and value", () => {
    render(
      <Field label="Minutes">
        <Select defaultValue="15" options={options}>
          <SelectTrigger />
        </Select>
      </Field>,
    );

    expect(
      screen.getByRole("combobox", { name: "Minutes 15" }),
    ).toBeInTheDocument();
  });
});
