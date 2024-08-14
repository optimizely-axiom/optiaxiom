import { describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Box } from "./Box";

describe("Box component", () => {
  it("should render properly", () => {
    render(<Box>This is a box</Box>);
    expect(screen.getByText(/This is a box/i)).toBeInTheDocument();
  });

  it("should merge sprinkle props properly", () => {
    render(
      <Box asChild mx="4">
        <Box asChild mx="2">
          <Box mx="0">This is a box</Box>
        </Box>
      </Box>,
    );
    expect(screen.getByText(/This is a box/i)).not.toContainHTML(
      "marginLeft_4",
    );
    expect(screen.getByText(/This is a box/i)).not.toContainHTML(
      "marginLeft_2",
    );
    expect(screen.getByText(/This is a box/i)).toContainHTML("marginLeft_0");
  });
});
