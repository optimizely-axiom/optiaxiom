import type { ComponentPropsWithoutRef } from "react";

import { Box } from "@optiaxiom/react";

import styles from "./App.module.css";

export function App() {
  return (
    <DemoBox className={styles.base} transition="colors">
      Contact Us
    </DemoBox>
  );
}

function DemoBox(props: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box
      color="fg.default"
      display="inline-flex"
      fontWeight="600"
      px="16"
      py="12"
      rounded="sm"
      textAlign="center"
      {...props}
    />
  );
}
