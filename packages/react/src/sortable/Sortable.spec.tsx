import { useState } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Sortable, SortableItem } from "./index";

describe("Sortable", () => {
  function setup() {
    function Queue() {
      const [items, setItems] = useState(["Draft brief", "Review copy"]);

      return (
        <Sortable items={items} onItemsChange={setItems}>
          {(items) =>
            items.map((item, index) => (
              <SortableItem index={index} item={item} key={item}>
                {item}
              </SortableItem>
            ))
          }
        </Sortable>
      );
    }

    return render(<Queue />);
  }

  it("renders the items in order", () => {
    setup();

    expect(
      screen
        .getAllByText(/Draft brief|Review copy/)
        .map((el) => el.textContent),
    ).toEqual(["Draft brief", "Review copy"]);
  });
});
