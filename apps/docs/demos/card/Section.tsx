"use client";

import { Box, type BoxProps, Text } from "@optiaxiom/react";
import { createContext, useContext } from "react";

import styles from "./Section.module.css";

const SectionContext = createContext(0);

export function Section({
  children,
  label,
  ...props
}: BoxProps & { label?: string }) {
  const depth = useContext(SectionContext);

  return (
    <SectionContext.Provider value={depth + 1}>
      <Box
        bg="bg.information.subtle"
        border="1"
        borderColor="border.focus"
        className={styles.section}
        color="fg.information.strong"
        data-depth={depth}
        fontSize="md"
        fontWeight="400"
        p="8"
        rounded="lg"
        w="auto"
        {...props}
      >
        {label && <Text>{label}</Text>}
        {children}
      </Box>
    </SectionContext.Provider>
  );
}
