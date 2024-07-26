import { Search as SearchComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Search = "ax-search";
register(Search, SearchComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Search]: ComponentAttributes<typeof SearchComponent>;
    }
  }
}
