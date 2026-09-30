import { afterEach, describe, expect, it } from "vitest";

import { formatDate } from "./formatDate";

describe("formatDate", () => {
  const tz = process.env.TZ;
  afterEach(() => {
    process.env.TZ = tz;
  });

  it("should format local fields after a timezone change", () => {
    process.env.TZ = "Europe/London";
    formatDate("en-US", new Date(), "LLLL yyyy");

    process.env.TZ = "Asia/Ho_Chi_Minh";
    const date = new Date(2026, 9, 1);
    expect(formatDate("en-US", date, "LLLL yyyy")).toBe("October 2026");
    expect(formatDate("en-US", date, "LLLL")).toBe("October");
    expect(formatDate("en-US", date, "LLL")).toBe("Oct");
    expect(formatDate("en-US", date, "ccccc")).toBe("T");
    expect(formatDate("en-US", date, "d")).toBe("1");
  });
});
