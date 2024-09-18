import { Input } from "@optiaxiom/react";
import { type ComponentPropsWithoutRef } from "react";

export function App({
  addonPointerEvents = "none",
}: Pick<ComponentPropsWithoutRef<typeof Input>, "addonPointerEvents">) {
  return (
    <Input
      addonBefore="@"
      addonPointerEvents={addonPointerEvents}
      placeholder="Email"
    />
  );
}
