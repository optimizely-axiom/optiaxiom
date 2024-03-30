import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Box } from "./Box";

describe("Box component", () => {
  it("should render properly", () => {
    render(<Box>This is a box</Box>);
    expect(screen.getByText(/This is a box/i)).toBeInTheDocument();
  });
});
