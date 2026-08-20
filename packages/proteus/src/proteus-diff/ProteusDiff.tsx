import { Box, Heading } from "@optiaxiom/react";
import { diffLines, diffWords } from "diff";
import { useMemo } from "react";

import * as styles from "./ProteusDiff.css";

type Token = {
  type: "added" | "removed" | "unchanged";
  value: string;
};

type DiffSide = {
  lineNumber: number;
  tokens?: Token[];
  type: "added" | "removed" | "unchanged";
} | null;

type DiffRow = {
  left: DiffSide;
  right: DiffSide;
};

export type ProteusDiffProps = {
  newText?: string;
  newTitle?: string;
  oldText?: string;
  oldTitle?: string;
  title?: string;
};

function computeWordTokens(
  oldLine: string,
  newLine: string,
): { left: Token[]; right: Token[] } {
  const changes = diffWords(oldLine, newLine);
  const left: Token[] = [];
  const right: Token[] = [];
  for (const change of changes) {
    if (change.added) {
      right.push({ type: "added", value: change.value });
    } else if (change.removed) {
      left.push({ type: "removed", value: change.value });
    } else {
      left.push({ type: "unchanged", value: change.value });
      right.push({ type: "unchanged", value: change.value });
    }
  }
  return { left, right };
}

function buildRows(oldText: string, newText: string): DiffRow[] {
  const changes = diffLines(oldText, newText);
  const rows: DiffRow[] = [];
  let leftLine = 1;
  let rightLine = 1;

  let i = 0;
  while (i < changes.length) {
    const change = changes[i];

    if (!change.added && !change.removed) {
      const lines = splitLines(change.value);
      for (const line of lines) {
        rows.push({
          left: { lineNumber: leftLine++, type: "unchanged" },
          right: { lineNumber: rightLine++, type: "unchanged" },
        });
        setPlainText(rows[rows.length - 1], "left", line);
        setPlainText(rows[rows.length - 1], "right", line);
      }
      i++;
    } else if (
      change.removed &&
      i + 1 < changes.length &&
      changes[i + 1].added
    ) {
      const removedLines = splitLines(change.value);
      const addedLines = splitLines(changes[i + 1].value);
      const maxLen = Math.max(removedLines.length, addedLines.length);

      for (let j = 0; j < maxLen; j++) {
        const oldLine = j < removedLines.length ? removedLines[j] : null;
        const newLine = j < addedLines.length ? addedLines[j] : null;

        if (oldLine !== null && newLine !== null) {
          const { left: leftTokens, right: rightTokens } = computeWordTokens(
            oldLine,
            newLine,
          );
          rows.push({
            left: {
              lineNumber: leftLine++,
              tokens: leftTokens,
              type: "removed",
            },
            right: {
              lineNumber: rightLine++,
              tokens: rightTokens,
              type: "added",
            },
          });
        } else if (oldLine !== null) {
          rows.push({
            left: { lineNumber: leftLine++, type: "removed" },
            right: null,
          });
          setPlainText(rows[rows.length - 1], "left", oldLine);
        } else if (newLine !== null) {
          rows.push({
            left: null,
            right: { lineNumber: rightLine++, type: "added" },
          });
          setPlainText(rows[rows.length - 1], "right", newLine);
        }
      }
      i += 2;
    } else if (change.removed) {
      const lines = splitLines(change.value);
      for (const line of lines) {
        rows.push({
          left: { lineNumber: leftLine++, type: "removed" },
          right: null,
        });
        setPlainText(rows[rows.length - 1], "left", line);
      }
      i++;
    } else if (change.added) {
      const lines = splitLines(change.value);
      for (const line of lines) {
        rows.push({
          left: null,
          right: { lineNumber: rightLine++, type: "added" },
        });
        setPlainText(rows[rows.length - 1], "right", line);
      }
      i++;
    } else {
      i++;
    }
  }

  return rows;
}

function splitLines(text: string): string[] {
  const lines = text.split("\n");
  if (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }
  return lines;
}

function setPlainText(row: DiffRow, side: "left" | "right", text: string) {
  const entry = row[side];
  if (entry) {
    entry.tokens = [{ type: "unchanged", value: text }];
  }
}

function TokenSpan({ tokens }: { tokens: Token[] }) {
  return (
    <>
      {tokens.map((token, i) => {
        if (token.type === "removed") {
          return (
            <span className={styles.removedToken} key={i}>
              {token.value}
            </span>
          );
        }
        if (token.type === "added") {
          return (
            <span className={styles.addedToken} key={i}>
              {token.value}
            </span>
          );
        }
        return <span key={i}>{token.value}</span>;
      })}
    </>
  );
}

export const ProteusDiff = ({
  newText = "",
  newTitle = "New",
  oldText = "",
  oldTitle = "Old",
  title,
}: ProteusDiffProps) => {
  const rows = useMemo(() => buildRows(oldText, newText), [oldText, newText]);

  if (rows.length === 0) {
    return null;
  }

  return (
    <Box>
      {title && (
        <Heading level="3" mb="8">
          {title}
        </Heading>
      )}
      <Box {...styles.container()}>
        <Box asChild {...styles.diffTable()}>
          <table>
            <colgroup>
              <col style={{ width: "3%" }} />
              <col style={{ width: "47%" }} />
              <col style={{ width: 0 }} />
              <col style={{ width: "3%" }} />
              <col style={{ width: "47%" }} />
            </colgroup>
            <thead>
              <tr>
                <Box asChild colSpan={2} {...styles.headerCell()}>
                  <th>{oldTitle}</th>
                </Box>
                <th style={{ width: 0 }} />
                <Box asChild colSpan={2} {...styles.headerCell()}>
                  <th>{newTitle}</th>
                </Box>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.left ? (
                    <>
                      <Box asChild {...styles.lineNumber()}>
                        <td>{row.left.lineNumber}</td>
                      </Box>
                      <Box
                        asChild
                        {...styles.lineContent({ type: row.left.type })}
                      >
                        <td>
                          {row.left.tokens && (
                            <TokenSpan tokens={row.left.tokens} />
                          )}
                        </td>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        asChild
                        {...styles.lineContent({ type: "empty" })}
                      >
                        <td />
                      </Box>
                      <Box
                        asChild
                        {...styles.lineContent({ type: "empty" })}
                      >
                        <td />
                      </Box>
                    </>
                  )}
                  <Box asChild {...styles.separator()}>
                    <td />
                  </Box>
                  {row.right ? (
                    <>
                      <Box asChild {...styles.lineNumber()}>
                        <td>{row.right.lineNumber}</td>
                      </Box>
                      <Box
                        asChild
                        {...styles.lineContent({ type: row.right.type })}
                      >
                        <td>
                          {row.right.tokens && (
                            <TokenSpan tokens={row.right.tokens} />
                          )}
                        </td>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        asChild
                        {...styles.lineContent({ type: "empty" })}
                      >
                        <td />
                      </Box>
                      <Box
                        asChild
                        {...styles.lineContent({ type: "empty" })}
                      >
                        <td />
                      </Box>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
};

ProteusDiff.displayName = "@optiaxiom/proteus/ProteusDiff";
