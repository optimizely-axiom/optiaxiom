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

  it("should keep a checkbox's value set before it loads", async () => {
    render(<Checkbox>Accept</Checkbox>);
    const element = screen.getByText<HTMLInputElement>("Accept");
    element.value = "yes";
    const checkbox = await waitFor(() =>
      withinShadowRoot(element).getByRole("checkbox"),
    );

    expect(checkbox).toHaveAttribute("value", "yes");
    expect(element.value).toBe("yes");
  });

  it("should read an input's name", async () => {
    render(<Input aria-label="Email" name="email" />);
    const element = screen.getByLabelText<HTMLInputElement>("Email");
    await waitFor(() => withinShadowRoot(element).getByRole("textbox"));

    expect(element.name).toBe("email");
  });

  it("should show the keyboard set by input-mode", async () => {
    render(<Input aria-label="Website" input-mode="url" />);
    const element = screen.getByLabelText("Website");
    const input = await waitFor(() =>
      withinShadowRoot(element).getByRole("textbox"),
    );

    expect(input).toHaveAttribute("inputmode", "url");
  });

  it("should show the keyboard set on inputMode before it loads", async () => {
    render(<Input aria-label="Code" />);
    const element = screen.getByLabelText<HTMLInputElement>("Code");
    element.inputMode = "numeric";
    const input = await waitFor(() =>
      withinShadowRoot(element).getByRole("textbox"),
    );

    expect(input).toHaveAttribute("inputmode", "numeric");
  });

  it("should mask the text of a password input", async () => {
    render(<Input aria-label="Password" type="password" />);
    const element = screen.getByLabelText<HTMLInputElement>("Password");
    const input = await waitFor(() =>
      withinShadowRoot(element).getByLabelText("Password"),
    );

    expect(input).toHaveAttribute("type", "password");
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
