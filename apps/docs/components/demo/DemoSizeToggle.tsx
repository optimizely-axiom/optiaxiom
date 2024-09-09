import { Box } from "@optiaxiom/react";

import styles from "./DemoSizeToggle.module.css";

export function DemoSizeToggle({
  collapsed,
  onCollapsedChange,
}: {
  collapsed: boolean;
  onCollapsedChange: () => void;
}) {
  return (
    <Box
      className={styles.container}
      display="flex"
      justifyContent="center"
      pb="md"
      pt="xl"
    >
      <Box
        asChild
        border="1"
        borderColor="border.secondary"
        className={styles.toggle}
        fontSize="sm"
        fontWeight="500"
        onClick={onCollapsedChange}
        rounded="sm"
      >
        <button>{collapsed ? "Expand code" : "Collapse code"}</button>
      </Box>
    </Box>
  );
}
