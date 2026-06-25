import { describe, expect, it } from "vitest";

import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("should format a valid Date object", () => {
    const result = formatDate("en-US", new Date("2026-06-26T10:00:00Z"), {
      showDate: true,
      showTime: true,
    });
    expect(result).not.toBe("");
    expect(typeof result).toBe("string");
  });

  describe("respects showDate / showTime flags", () => {
    const date = new Date("2026-06-26T10:00:00Z");

    it("includes date components when showDate is true", () => {
      const result = formatDate("en-US", date, {
        showDate: true,
        showTime: false,
      });
      expect(result).not.toBe("");
    });

    it("includes time components when showTime is true", () => {
      const result = formatDate("en-US", date, {
        showDate: false,
        showTime: true,
      });
      expect(result).not.toBe("");
    });
  });
});
