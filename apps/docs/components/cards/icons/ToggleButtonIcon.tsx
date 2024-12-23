import { theme } from "@optiaxiom/react";

import { IconBox } from "./IconBox";
import { IconButton } from "./IconButton";
import { IconText } from "./IconText";

export const ToggleButtonIcon = () => (
  <IconBox bg="bg.default" display="flex" flexDirection="row" gap="0">
    <IconButton
      p="6"
      px="6"
      style={{ backgroundColor: theme.colors["bg.accent.subtle"] }}
    >
      <IconText intent="secondary" p="4" />
    </IconButton>
  </IconBox>
);
