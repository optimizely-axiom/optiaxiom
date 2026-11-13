import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Pagination } from "./index";

describe("Pagination", () => {
  function setup() {
    const onPageChange = vi.fn();

    function ControlledPagination() {
      const [page, setPage] = useState(1);

      return (
        <Pagination
          onPageChange={(page) => {
            setPage(page);
            onPageChange(page);
          }}
          page={page}
          total={5}
        />
      );
    }

    return { ...render(<ControlledPagination />), onPageChange };
  }

  it("shows the page the user clicks", async () => {
    const { onPageChange, user } = setup();

    await user.click(screen.getByRole("button", { name: "page 3" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
    expect(
      screen.getByRole("button", { current: "page" }),
    ).toHaveAccessibleName("page 3");
  });

  it("steps through pages with the next and previous buttons", async () => {
    const { user } = setup();

    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(
      screen.getByRole("button", { current: "page" }),
    ).toHaveAccessibleName("page 2");

    await user.click(
      screen.getByRole("button", { name: "page 5 (last page)" }),
    );
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });
});
