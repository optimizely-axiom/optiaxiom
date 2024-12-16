import { Grid } from "@optiaxiom/react";

import { AlertDialogIcon } from "./AlertDialogIcon";
import { AlertIcon } from "./AlertIcon";
import styles from "./ComponentsIcon.module.css";
import { DialogIcon } from "./DialogIcon";

export const ComponentsIcon = () => (
  <Grid
    className={styles.icon}
    style={{
      transform: "rotate3d(1, 1, 0, 45deg)",
      transformStyle: "preserve-3d",
    }}
  >
    <DialogIcon className={styles.layer} transition="all" />
    <AlertIcon className={styles.layer} transition="all" />
    <AlertDialogIcon className={styles.layer} transition="all" />
  </Grid>
);
