import type { ComponentPropsWithRef } from "react";

import { Link, Text } from "@optiaxiom/react";

export function App({
  disabled = true,
}: Pick<ComponentPropsWithRef<typeof Link>, "disabled">) {
  return (
    <Text>
      This is{" "}
      <Link disabled={disabled} href="data:,">
        a disabled link
      </Link>
    </Text>
  );
}
