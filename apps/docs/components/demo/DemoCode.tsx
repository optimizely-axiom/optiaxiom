"use client";

import { Box, Group } from "@optiaxiom/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { CopyButton } from "./CopyButton";
import styles from "./DemoCode.module.css";
import { DemoSizeToggle } from "./DemoSizeToggle";
import { StackblitzButton } from "./StackblitzButton";

export function DemoCode({
  children,
  files,
}: {
  children: ReactNode;
  files: Record<string, string>;
}) {
  const [collapsed, setCollapsed] = useState<boolean | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && ref.current.scrollHeight > 300) {
      setCollapsed(true);
    }
  }, []);
  useEffect(() => {
    if (collapsed === true && ref.current) {
      const element = ref.current.querySelector(
        ':is(:scope > [class~="nextra-code"], :has(> [role="tabpanel"]))',
      );
      if (element) {
        element.scrollTop = 0;
      }
    }
  }, [collapsed]);

  return (
    <Box
      border="1"
      borderColor="border.tertiary"
      className={[
        styles.editor,
        collapsed !== null && styles.expandable,
        collapsed === false && styles.expanded,
      ]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
    >
      {children}
      <Group className={styles.toolbar} gap="2" transition="opacity">
        <StackblitzButton files={files} />
        <CopyButton
          onCopy={() =>
            (
              ref.current?.querySelector(
                "[role='tabpanel'][tabindex='0'] pre code",
              ) || ref.current?.querySelector("pre code")
            )?.textContent || ""
          }
        />
      </Group>
      {collapsed !== null && (
        <DemoSizeToggle
          collapsed={collapsed}
          onCollapsedChange={() => setCollapsed((flag) => !flag)}
        />
      )}
    </Box>
  );
}
