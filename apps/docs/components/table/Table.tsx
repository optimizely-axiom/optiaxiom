import type { ComponentPropsWithRef } from "react";

import styles from "./Table.module.css";

export const Table = ({
  children,
  className = "",
}: ComponentPropsWithRef<"table">) => (
  <div className={`${styles.base} nx-mt-6 nx-max-h-96`}>
    <table className={`nx-w-full nx-text-sm nx-text-left ${className}`}>
      {children}
    </table>
  </div>
);
