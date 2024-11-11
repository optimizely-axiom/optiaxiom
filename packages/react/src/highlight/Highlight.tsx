import { Fragment, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Highlight.css";
import { useHighlightedChunks } from "./useHighlightedChunks";

type HighlightProps = BoxProps<
  "div",
  {
    children?: (chunk: string) => ReactNode;
    content?: string;
    query?: RegExp | RegExp[] | string | string[];
  }
>;

export function Highlight({
  className,
  content,
  query,
  ...props
}: HighlightProps) {
  const chunks = useHighlightedChunks(content || "", query);

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
