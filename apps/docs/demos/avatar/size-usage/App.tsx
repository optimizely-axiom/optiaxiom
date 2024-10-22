import type { ComponentPropsWithRef } from "react";

import { Avatar } from "@optiaxiom/react";

export function App({
  size = "md",
}: Pick<ComponentPropsWithRef<typeof Avatar>, "size">) {
  return <Avatar size={size}>AM</Avatar>;
}
