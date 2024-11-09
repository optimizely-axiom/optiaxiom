import { Fragment, type ReactNode, useMemo } from "react";

import { Box, type BoxProps } from "../box";
import { getHighlightedChunks } from "./getHighlightedChunks";
import * as styles from "./Highlight.css";

type HighlightProps = BoxProps<
  "div",
  {
    children?: (chunk: string) => ReactNode;
    content?: string;
    query?: string | string[];
  }
>;

export function Highlight({
  className,
  content,
  query,
  ...props
}: HighlightProps) {
  const terms = useMemo(
    () =>
      (Array.isArray(query) ? query : query ? [query] : [])
        .map((q) => q.trim())
        .filter(Boolean),
    [query],
  );
  const chunks = getHighlightedChunks(content || "", terms);

  return (
    <>
      {chunks.map(({ chunk, highlighted }, index) => (
        <Fragment key={index}>
          {highlighted ? (
            <Box asChild {...styles.mark({}, className)} {...props}>
              <mark>{chunk}</mark>
            </Box>
          ) : (
            chunk
          )}
        </Fragment>
      ))}
    </>
  );
}

Highlight.displayName = "@optiaxiom/react/Highlight";
