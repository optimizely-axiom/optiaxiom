import type { ComponentPropsWithRef } from "react";

import { Input } from "@optiaxiom/react";

export function App({
  size,
}: Pick<ComponentPropsWithRef<typeof Input>, "size">) {
  return <Input placeholder="Enter text..." size={size} />;
}
