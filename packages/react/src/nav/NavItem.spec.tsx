import { describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Sidebar } from "../sidebar";
import { NavItem } from "./NavItem";

describe("NavItem", () => {
  it("should set aria-current to page when active", () => {
    render(
      <Sidebar>
        <NavItem active>Dashboard</NavItem>
      </Sidebar>,
    );

    expect(screen.getByRole("button", { name: "Dashboard" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("should not set aria-current when inactive", () => {
    render(
      <Sidebar>
        <NavItem>Dashboard</NavItem>
      </Sidebar>,
    );

    expect(
      screen.getByRole("button", { name: "Dashboard" }),
    ).not.toHaveAttribute("aria-current");
  });
});
