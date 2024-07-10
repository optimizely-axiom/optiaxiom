import type { ComponentPropsWithRef } from "react";

import { Button } from "@optiaxiom/react";
import { IconTrash } from "@tabler/icons-react";

export function App({
  appearance = "default",
  iconPosition = "start",
}: Pick<ComponentPropsWithRef<typeof Button>, "appearance" | "iconPosition">) {
  return (
    <Button
      appearance={appearance}
      icon={<IconTrash />}
      iconPosition={iconPosition}
    >
      Delete
    </Button>
  );
}
