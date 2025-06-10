"use client";

import { Sortable, SortableItem } from "@optiaxiom/react/unstable";
import { useState } from "react";

import { calculateRank } from "./calculateRank";

export function App() {
  const [data, setData] = useState([
    {
      id: "A",
      rank: 10_000,
    },
    {
      id: "B",
      rank: 20_000,
    },
    {
      id: "C",
      rank: 30_000,
    },
  ]);

  return (
    <Sortable
      items={data.toSorted((a, b) => a.rank - b.rank).map((item) => item.id)}
      onChange={({ items, source }) => {
        setData(
          data.map((item) =>
            item.id === source
              ? {
                  ...item,
                  rank: calculateRank(data, source, items),
                }
              : item,
          ),
        );
      }}
    >
      {({ id }) => <SortableItem border="1">Item {id}</SortableItem>}
    </Sortable>
  );
}
