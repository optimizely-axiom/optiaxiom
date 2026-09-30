import { afterEach, describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { AxiomProvider } from "../axiom-provider";
import { DateRangePicker } from "./DateRangePicker";
import { DateRangePickerTrigger } from "./DateRangePickerTrigger";

describe("DateRangePicker", () => {
  const tz = process.env.TZ;
  afterEach(() => {
    process.env.TZ = tz;
  });

  function setup() {
    return render(
      <AxiomProvider locale="en-US">
        <DateRangePicker
          value={{ from: new Date(2026, 9, 1), to: new Date(2026, 9, 2) }}
        >
          <DateRangePickerTrigger />
        </DateRangePicker>
      </AxiomProvider>,
    );
  }

  it("should show the selected dates after a timezone change", () => {
    process.env.TZ = "Europe/London";
    setup().unmount();

    process.env.TZ = "Asia/Ho_Chi_Minh";
    setup();

    expect(screen.getByRole("button")).toHaveTextContent("Oct 1 – 2, 2026");
  });
});
