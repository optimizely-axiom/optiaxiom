import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { render, screen, within } from "../../vitest.rtl";
import { Pagination } from "./index";

const orders = Array.from({ length: 50 }, (_, i) => `Order ${i + 1}`);
const pageSize = 10;

function Orders({ onPageChange }: { onPageChange?: (page: number) => void }) {
  const [page, setPage] = useState(1);

  return (
    <>
      <ul aria-label="Orders">
        {orders.slice((page - 1) * pageSize, page * pageSize).map((order) => (
          <li key={order}>{order}</li>
        ))}
      </ul>
      <Pagination
        onPageChange={(page) => {
          setPage(page);
          onPageChange?.(page);
        }}
        page={page}
        total={orders.length / pageSize}
      />
    </>
  );
}

describe("Pagination", () => {
  it("shows the page the user clicks", async () => {
    const onPageChange = vi.fn();
    const { user } = render(<Orders onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "page 3" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
    expect(
      screen.getByRole("button", { current: "page" }),
    ).toHaveAccessibleName("page 3");
    expect(
      within(screen.getByRole("list", { name: "Orders" })).getAllByRole(
        "listitem",
      )[0],
    ).toHaveTextContent("Order 21");
  });

  it("steps through pages with the next and previous buttons", async () => {
    const { user } = render(<Orders />);

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
