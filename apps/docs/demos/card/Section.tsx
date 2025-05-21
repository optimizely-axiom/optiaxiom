"use client";

import { Box, type BoxProps, Text } from "@optiaxiom/react";
import { cloneElement, createContext, isValidElement, useContext } from "react";

import styles from "./Section.module.css";

const SectionContext = createContext(0);

export function Section({
  children,
  inset,
  label,
  ...props
}: BoxProps & { inset?: boolean; label?: string }) {
  const depth = useContext(SectionContext);

  return (
    <SectionContext.Provider value={depth + 1}>
      <Box
        alignItems="end"
        bg="bg.information.subtle"
        border="1"
        borderColor="border.focus"
        className={styles.section}
        color="fg.information.strong"
        data-depth={depth}
        data-inset={inset ? "" : undefined}
        fontSize="md"
        fontWeight="400"
        p="8"
        rounded="lg"
        w="auto"
        {...props}
      >
        {isValidElement(children) && props.asChild ? (
          cloneElement(
            children,
            undefined,
            <>
              {children.props.children}
              {label && <Text className={styles.label}>{label}</Text>}
            </>,
          )
        ) : (
          <>
            {children}
            {label && <Text className={styles.label}>{label}</Text>}
          </>
        )}
      </Box>
    </SectionContext.Provider>
  );
}
