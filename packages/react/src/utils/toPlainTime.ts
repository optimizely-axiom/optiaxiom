import { toPlainDateTime } from "./toPlainDateTime";

/**
 * Convert an instant Date to a local time string in hh:mm format.
 *
 * Rounds to the nearest time based on the step attribute.
 */
export const toPlainTime = (date: Date, step: number | string = "60") => {
  const stepInMinutes = (typeof step === "string" ? parseInt(step) : step) / 60;
  const [hour, minute] = toPlainDateTime(date)
    .split("T")[1]
    .slice(0, 5)
    .split(":");
  return (
    hour +
    ":" +
    (Math.floor(parseInt(minute) / stepInMinutes) * stepInMinutes)
      .toString()
      .padStart(2, "0")
  );
};
