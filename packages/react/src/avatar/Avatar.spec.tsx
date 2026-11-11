import type { ComponentPropsWithoutRef } from "react";

import { describe, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Avatar } from "./Avatar";

describe("Avatar component", () => {
  describe("Avatar fallback", () => {
    function setup(overrides: ComponentPropsWithoutRef<typeof Avatar> = {}) {
      return render(<Avatar {...overrides} />);
    }

    it("should render children if only children is provided", async () => {
      setup({ children: "TH" });
      await screen.findByText("TH");
    });

    it("should render initials if name is provided and children is not", async () => {
      setup({ name: "Mary Celine" });
      await screen.findByText("MC");
    });

    it("should render children if name is provided but children is also set", async () => {
      setup({ children: "TH", name: "Mary Celine" });
      await screen.findByText("TH");
    });
  });
});
