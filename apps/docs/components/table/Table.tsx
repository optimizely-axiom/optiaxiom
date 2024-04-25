import type { ComponentPropsWithRef } from "react";

import styles from "./Table.module.css";

export const Table = ({
  children,
  className = "",
}: ComponentPropsWithRef<"table">) => (
  <div className={styles.base}>
    <table className={`nx-w-full nx-text-sm nx-text-left nx-mt-6 ${className}`}>
      {children}
    </table>
  </div>
);
