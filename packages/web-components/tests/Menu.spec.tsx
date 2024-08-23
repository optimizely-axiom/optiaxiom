// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu } from "@optiaxiom/web-components/Menu";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MenuContent } from "@optiaxiom/web-components/MenuContent";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MenuItem } from "@optiaxiom/web-components/MenuItem";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MenuSeparator } from "@optiaxiom/web-components/MenuSeparator";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MenuTrigger } from "@optiaxiom/web-components/MenuTrigger";
import { describe, expect, it } from "vitest";

import { render, screen } from "../vitest.rtl";

describe("Menu component", () => {
  function setup() {
    return render(
      <Menu>
        <MenuTrigger>Profile</MenuTrigger>

        <MenuContent>
          <MenuItem>View Profile</MenuItem>
          <MenuSeparator />
          <MenuItem>Logout</MenuItem>
        </MenuContent>
      </Menu>,
    );
  }

  it("should render properly", async () => {
    setup();

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(
      screen.queryByRole("menuitem", { name: "View Profile" }),
    ).not.toBeInTheDocument();
  });

  it("should open menu on click", async () => {
    const { user } = setup();

    await user.hover(screen.getByText("Profile"));
    expect(await screen.findByText("View Profile")).toBeInTheDocument();

    await user.click(screen.getByText("Logout"));
    expect(
      screen.queryByRole("menuitem", { name: "View Profile" }),
    ).not.toBeInTheDocument();
  });
});
