import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { DateRangePicker } from "./DateRangePicker";
import { DateRangePickerContent } from "./DateRangePickerContent";
import { DateRangePickerTrigger } from "./DateRangePickerTrigger";

describe("DateRangePicker", () => {
  it("discards an incomplete range when the open picker becomes disabled", async () => {
    const onValueChange = vi.fn();
    const initial = {
      from: new Date(2026, 10, 12),
      to: new Date(2026, 10, 15, 23, 59, 59, 999),
    };
    const picker = (disabled: boolean) => (
      <DateRangePicker
        disabled={disabled}
        onValueChange={onValueChange}
        value={initial}
      >
        <DateRangePickerTrigger />
        <DateRangePickerContent />
      </DateRangePicker>
    );
    const { rerender, user } = render(picker(false));
    const trigger = screen.getByRole("button", { name: /Nov 12/ });

    await user.click(trigger);
    await user.click(
      await screen.findByRole("button", { name: /November 16/ }),
    );
    expect(onValueChange).not.toHaveBeenCalled();

    rerender(picker(true));

    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(onValueChange).not.toHaveBeenCalled();

    rerender(picker(false));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    await user.click(
      await screen.findByRole("button", { name: /November 16/ }),
    );
    await user.click(screen.getByRole("button", { name: /November 18/ }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });
});
