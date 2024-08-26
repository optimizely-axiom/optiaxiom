import { Input } from "@optiaxiom/react";
import { type ComponentPropsWithoutRef } from "react";

export function App({
  decoratorPointerEvents = "none",
}: Pick<ComponentPropsWithoutRef<typeof Input>, "decoratorPointerEvents">) {
  return (
    <Input
      decoratorPointerEvents={decoratorPointerEvents}
      placeholder="Email"
      startDecorator="@"
    />
  );
}
