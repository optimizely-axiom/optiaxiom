import { useRef } from "react";
import { act } from "react-dom/test-utils";
import { describe, expect, it } from "vitest";

import { render, screen, waitFor } from "../../vitest.rtl";
import { Box } from "../box";
import { Ripple } from "./Ripple";

const Component = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box p="16" ref={ref}>
      Sample Component
      <Ripple data-testid="ripple" targetRef={ref} />
    </Box>
  );
};

describe("Ripple component", () => {
  it("should render properly", async () => {
    const { user } = render(<Component />);

    expect(screen.queryByTestId("ripple-child")).not.toBeInTheDocument();

    // use `act()` to finish up any renders triggered by clicking the mouse button
    await act(async () => {
      await user.pointer({
        keys: "[MouseLeft>]",
        target: screen.getByText("Sample Component"),
      });
    });
    expect(screen.getByTestId("ripple-child")).toBeInTheDocument();

    // use `act()` to finish up any renders triggered by lifting the mouse button
    await act(async () => {
      await user.pointer({
        keys: "[/MouseLeft]",
        target: screen.getByText("Sample Component"),
      });
    });
    // manually trigger css event since RTL user event simulations cannot trigger them
    screen
      .getByTestId("ripple-child")
      .dispatchEvent(new Event("animationend", { bubbles: true }));

    await waitFor(() =>
      expect(screen.getByTestId("ripple")).toBeEmptyDOMElement(),
    );
  });

  it("should ignore mouse right clicks", async () => {
    const { user } = render(<Component />);

    expect(screen.queryByTestId("ripple-child")).not.toBeInTheDocument();

    await act(async () => {
      await user.pointer({
        keys: "[MouseRight]",
        target: screen.getByText("Sample Component"),
      });
    });

    expect(screen.queryByTestId("ripple-child")).not.toBeInTheDocument();
  });

  it("should remove ripple on mouse leave", async () => {
    const { user } = render(<Component />);

    expect(screen.queryByTestId("ripple-child")).not.toBeInTheDocument();

    await act(async () => {
      await user.pointer({
        keys: "[MouseLeft>]",
        target: screen.getByText("Sample Component"),
      });
    });
    expect(screen.getByTestId("ripple-child")).toBeInTheDocument();

    await act(async () => {
      await user.unhover(screen.getByText("Sample Component"));
    });
    screen
      .getByTestId("ripple-child")
      .dispatchEvent(new Event("animationend", { bubbles: true }));

    await waitFor(() =>
      expect(screen.getByTestId("ripple")).toBeEmptyDOMElement(),
    );
  });
});
