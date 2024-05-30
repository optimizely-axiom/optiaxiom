import { describe, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Avatar } from "./Avatar";

describe("Avatar component", () => {
  describe("Avatar fallback", () => {
    it("should render children if only children is provided", async () => {
      render(<Avatar>TH</Avatar>);
      await screen.findByText("TH");
    });

    it("should render initials if name is provided", async () => {
      render(<Avatar name="Mary Celine">TH</Avatar>);
      await screen.findByText("MC");
    });
  });
});
