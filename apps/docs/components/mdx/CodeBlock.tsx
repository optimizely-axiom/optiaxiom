"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box } from "@optiaxiom/react";
import { useMDXComponents } from "nextra-theme-docs";
import { useRef } from "react";

import { CopyButton } from "../demo/CopyButton";
import styles from "./CodeBlock.module.css";

export function CodeBlock(
  props: ComponentPropsWithoutRef<"pre"> & { "data-filename"?: string },
) {
  const { pre: Pre = "pre" } = useMDXComponents();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box className={styles.root} ref={ref}>
      <Pre {...props} />
      <Box
        className={styles.toolbar}
        // Sit below the filename header that Nextra renders above the code.
        style={props["data-filename"] ? { top: "calc(48px + 12px)" } : {}}
        transition="opacity"
      >
        <CopyButton
          onCopy={() =>
            ref.current?.querySelector("pre code")?.textContent || ""
          }
        />
      </Box>
    </Box>
  );
}
