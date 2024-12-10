import type { ComponentPropsWithoutRef } from "react";

import { Avatar } from "@optiaxiom/react";

export function App({
  fallback = "user",
}: Pick<ComponentPropsWithoutRef<typeof Avatar>, "fallback">) {
  return <Avatar fallback={fallback} />;
}
