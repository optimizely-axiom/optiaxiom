// Registers every element lazily, the way consumers load the package. Form
// elements only construct on that path.
import "@optiaxiom/web-components";
import { describe, expect, it } from "vitest";

import { render, screen, waitFor, withinShadowRoot } from "../vitest.rtl";

const Checkbox = "ax-checkbox";
const Input = "ax-input";

describe("form-associated elements", () => {
  it("should read the typed text from an input's value", async () => {
    const { user } = render(<Input aria-label="Name" />);
    const element = screen.getByLabelText<HTMLInputElement>("Name");
    const input = await waitFor(() =>
      withinShadowRoot(element).getByRole("textbox"),
    );

    await user.type(input, "Ada");

    expect(element.value).toBe("Ada");
  });

  it("should read the toggled state from a checkbox's checked", async () => {
    const { user } = render(<Checkbox>Accept</Checkbox>);
    const element = screen.getByText<HTMLInputElement>("Accept");
    const checkbox = await waitFor(() =>
      withinShadowRoot(element).getByRole("checkbox"),
    );

    await user.click(checkbox);

    expect(element.checked).toBe(true);
  });
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [Checkbox]: any;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [Input]: any;
    }
  }
}
