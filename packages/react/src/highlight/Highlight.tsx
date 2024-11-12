import { Fragment, type ReactElement, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Highlight.css";
import { useHighlightedChunks } from "./useHighlightedChunks";

type HighlightProps = BoxProps<
  "div",
  {
    children?: (chunk: ReactElement) => ReactNode;
    content?: string;
    query?: RegExp | RegExp[] | string | string[];
  }
>;

export function Highlight({
  children = (chunk) => chunk,
  content,
  query,
  ...props
}: HighlightProps) {
  const chunks = useHighlightedChunks(content || "", query);

  return (
    <Box {...props}>
      {chunks.map(({ chunk, highlighted }, index) => (
        <Fragment key={index}>
          {highlighted
            ? children(
                <Box asChild {...styles.mark()}>
                  <mark>{chunk}</mark>
                </Box>,
              )
            : chunk}
        </Fragment>
      ))}
    </Box>
  );
}

Highlight.displayName = "@optiaxiom/react/Highlight";
