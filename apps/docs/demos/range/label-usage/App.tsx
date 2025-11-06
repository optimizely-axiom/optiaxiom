"use client";

import { Range } from "@optiaxiom/react/unstable";

export function App({ showTooltip = true }: { showTooltip?: boolean }) {
  return (
    <Range
      defaultValue={30}
      getLabel={(value) => `${value}%`}
      showTooltip={showTooltip}
      w="384"
    />
  );
}
