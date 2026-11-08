import { describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { SidebarProvider } from "../sidebar/internals";
import { Nav } from "./Nav";

const renderNav = (props: Parameters<typeof Nav>[0] = {}) =>
  render(
    <SidebarProvider
      expanded
      navId="nav"
      onExpandedChange={() => {}}
      spacing="8"
    >
      <Nav {...props}>Links</Nav>
    </SidebarProvider>,
  );

describe("Nav component", () => {
  it("should default the nav element label to Main", () => {
    renderNav();

    expect(
      screen.getByRole("navigation", { name: "Main" }),
    ).toBeInTheDocument();
  });

  it("should apply a consumer aria-label to the nav element", () => {
    renderNav({ "aria-label": "Primary site" });

    expect(
      screen.getByRole("navigation", { name: "Primary site" }),
    ).toBeInTheDocument();
  });

  it("should apply a consumer aria-labelledby to the nav element", () => {
    render(
      <SidebarProvider
        expanded
        navId="nav"
        onExpandedChange={() => {}}
        spacing="8"
      >
        <span id="nav-heading">Site menu</span>
        <Nav aria-labelledby="nav-heading">Links</Nav>
      </SidebarProvider>,
    );

    expect(
      screen.getByRole("navigation", { name: "Site menu" }),
    ).toBeInTheDocument();
  });
});
