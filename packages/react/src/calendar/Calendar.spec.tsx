import { afterEach, describe, expect, it } from "vitest";

import { render, screen, within } from "../../vitest.rtl";
import { AxiomProvider } from "../axiom-provider";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  const tz = process.env.TZ;
  afterEach(() => {
    process.env.TZ = tz;
  });

  function setup() {
    return render(
      <AxiomProvider locale="en-US">
        <Calendar value={new Date(2026, 9, 2)} />
      </AxiomProvider>,
    );
  }

  it("should keep labels in sync with day cells after a timezone change", () => {
    process.env.TZ = "Europe/London";
    setup().unmount();

    process.env.TZ = "Asia/Ho_Chi_Minh";
    setup();

    expect(
      screen.getByRole("button", { name: /^October 2026/ }),
    ).toBeInTheDocument();
    const headers = screen
      .getAllByRole("columnheader", { hidden: true })
      .map((header) => header.textContent);
    expect(headers).toEqual(["S", "M", "T", "W", "T", "F", "S"]);

    const week = screen
      .getAllByRole("row")
      .find((row) => within(row).queryByText("2"))!;
    const column = within(week)
      .getAllByRole("gridcell")
      .findIndex((cell) => within(cell).queryByText("2"));
    expect(column).toBe(headers.indexOf("F"));
  });
});
