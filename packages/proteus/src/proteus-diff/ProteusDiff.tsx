import { Badge, Box, Heading } from "@optiaxiom/react";

import * as styles from "./ProteusDiff.css";

type DiffChange = {
  field: string;
  newValue?: string;
  oldValue?: string;
  type?: "added" | "modified" | "removed";
};

export type ProteusDiffProps = {
  changes?: DiffChange[];
  newTitle?: string;
  oldTitle?: string;
  title?: string;
};

function inferType(change: DiffChange): "added" | "modified" | "removed" {
  if (change.type) {
    return change.type;
  }
  if (change.oldValue == null) {
    return "added";
  }
  if (change.newValue == null) {
    return "removed";
  }
  return "modified";
}

const intentMap = {
  added: "success",
  modified: "warning",
  removed: "danger",
} as const;

export const ProteusDiff = ({
  changes,
  newTitle = "New",
  oldTitle = "Old",
  title,
}: ProteusDiffProps) => {
  if (!changes || changes.length === 0) {
    return null;
  }

  return (
    <Box>
      {title && (
        <Heading level="3" mb="8">
          {title}
        </Heading>
      )}
      <Box asChild className={styles.table()}>
        <table>
          <thead>
            <tr>
              <Box asChild className={styles.th()}>
                <th>Field</th>
              </Box>
              <Box asChild className={styles.th()}>
                <th>{oldTitle}</th>
              </Box>
              <Box asChild className={styles.th()}>
                <th>{newTitle}</th>
              </Box>
              <Box asChild className={styles.th()}>
                <th>Change</th>
              </Box>
            </tr>
          </thead>
          <tbody>
            {changes.map((change, index) => {
              const type = inferType(change);
              return (
                <tr key={index}>
                  <Box asChild className={`${styles.td()} ${styles.fieldCell()}`}>
                    <td>{change.field}</td>
                  </Box>
                  <Box asChild className={styles.td()}>
                    <td>{change.oldValue ?? "—"}</td>
                  </Box>
                  <Box asChild className={styles.td()}>
                    <td>{change.newValue ?? "—"}</td>
                  </Box>
                  <Box asChild className={styles.td()}>
                    <td>
                      <Badge intent={intentMap[type]}>{type}</Badge>
                    </td>
                  </Box>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

ProteusDiff.displayName = "@optiaxiom/proteus/ProteusDiff";
