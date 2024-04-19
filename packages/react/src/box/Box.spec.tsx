import { describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Box } from "./Box";

describe("Box component", () => {
  it("should render properly", () => {
    render(<Box>This is a box</Box>);
    expect(screen.getByText(/This is a box/i)).toBeInTheDocument();
  });
});
