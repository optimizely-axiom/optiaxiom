// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DropdownMenu } from "@optiaxiom/web-components/DropdownMenu";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DropdownMenuContent } from "@optiaxiom/web-components/DropdownMenuContent";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DropdownMenuItem } from "@optiaxiom/web-components/DropdownMenuItem";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DropdownMenuSeparator } from "@optiaxiom/web-components/DropdownMenuSeparator";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DropdownMenuTrigger } from "@optiaxiom/web-components/DropdownMenuTrigger";
import { describe, expect, it } from "vitest";

import { render, screen } from "../vitest.rtl";

describe("DropdownMenu component", () => {
  function setup() {
    return render(
      <DropdownMenu>
        <DropdownMenuTrigger>Profile</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem>View Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
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
