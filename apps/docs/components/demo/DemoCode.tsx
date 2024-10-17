import { Box } from "@optiaxiom/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import styles from "./DemoCode.module.css";
import { DemoSizeToggle } from "./DemoSizeToggle";

export function DemoCode({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && ref.current.offsetHeight > 400) {
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
      className={[
        styles.editor,
        collapsed !== null && styles.expandable,
        collapsed && styles.collapsed,
      ]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
    >
      {children}
      {collapsed !== null && (
        <DemoSizeToggle
          collapsed={collapsed}
          onCollapsedChange={() => setCollapsed((flag) => !flag)}
        />
      )}
    </Box>
  );
}
