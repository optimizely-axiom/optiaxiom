import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Button } from "../button";
import { Text } from "../text";
import { Box } from "./Box";

describe("Box component", () => {
  describe("on its own and nested with asChild", () => {
    /**
     * Renders one Box per argument, outermost first; every Box but the last
     * passes its props down with `asChild`.
     */
    function setup(...boxes: ComponentPropsWithoutRef<typeof Box>[]) {
      return render(
        boxes.reduceRight<ReactNode>(
          (children, props, index) =>
            index === boxes.length - 1 ? (
              <Box {...props}>{children}</Box>
            ) : (
              <Box asChild {...props}>
                {children}
              </Box>
            ),
          "This is a box",
        ),
      );
    }

    it("should render properly", () => {
      setup({});
      expect(screen.getByText(/This is a box/i)).toBeInTheDocument();
    });

    it("should merge sprinkle props properly for direct props", () => {
      setup({ mx: "4" }, { mx: "2" }, { mx: "0" });
      expect(screen.getByText(/This is a box/i)).not.toContainHTML(
        "marginLeft_4",
      );
      expect(screen.getByText(/This is a box/i)).not.toContainHTML(
        "marginLeft_2",
      );
      expect(screen.getByText(/This is a box/i)).toContainHTML("marginLeft_0");
    });

    it("should merge sprinkle props properly for direct undefined props", () => {
      setup({ mx: "4" }, { mx: "2" }, { mx: undefined });
      expect(screen.getByText(/This is a box/i)).not.toContainHTML(
        "marginLeft_4",
      );
      expect(screen.getByText(/This is a box/i)).toContainHTML("marginLeft_2");
    });

    it("should merge sprinkle props properly for direct shorthand props", () => {
      setup({ mx: "4" }, { m: "2" });
      expect(screen.getByText(/This is a box/i)).not.toContainHTML(
        "marginLeft_4",
      );
      expect(screen.getByText(/This is a box/i)).toContainHTML("marginLeft_2");
    });

    it("should merge sprinkle props properly for shorthand and longhand props", () => {
      setup({ m: "4", ml: "2" });
      expect(screen.getByText(/This is a box/i)).not.toContainHTML(
        "marginLeft_4",
      );
      expect(screen.getByText(/This is a box/i)).toContainHTML("marginLeft_2");
    });

    it("should merge sprinkle props properly for responsive props", () => {
      setup({ flexDirection: ["column", "row"] });
      expect(screen.getByText(/This is a box/i)).toContainHTML(
        "flexDirection_column",
      );
      expect(screen.getByText(/This is a box/i)).toContainHTML(
        "flexDirection_row",
      );
    });

    it("should merge responsive spacing props properly for direct props", () => {
      setup({ pl: { sm: "32" } }, { pl: { sm: "8" } });
      // jsdom can't evaluate the breakpoint class, so check the inline var values
      expect(
        screen.getByText(/This is a box/i).getAttribute("style"),
      ).toContain("calc(0.5 *");
      expect(
        screen.getByText(/This is a box/i).getAttribute("style"),
      ).not.toContain("calc(2 *");
    });

    it("should keep responsive spacing props from parent when child sets base value", () => {
      setup({ pl: { sm: "32" } }, { pl: "8" });
      expect(screen.getByText(/This is a box/i)).toContainHTML("paddingLeft_8");
      expect(
        screen.getByText(/This is a box/i).getAttribute("style"),
      ).toContain("calc(2 *");
    });
  });

  describe("through another component", () => {
    function setup() {
      return render(
        <Text asChild fontSize="sm">
          <Button>This is a button</Button>
        </Text>,
      );
    }

    it("should merge sprinkle props properly for indirect props", () => {
      setup();
      expect(screen.getByRole("button")).not.toContainHTML("fontSize_sm");
      expect(screen.getByRole("button")).toContainHTML("fontSize_md");
    });
  });
});
