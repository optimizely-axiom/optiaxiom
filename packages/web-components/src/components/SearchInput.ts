import { SearchInput as SearchInputComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const SearchInput = "ax-search-input";
export default register(SearchInput, SearchInputComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [SearchInput]: ComponentAttributes<typeof SearchInputComponent>;
    }
  }
}
