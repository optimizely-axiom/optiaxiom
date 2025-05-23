import { forwardRef, Fragment, type ReactElement, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Highlight.css";
import { useHighlightedChunks } from "./useHighlightedChunks";

export type HighlightProps = BoxProps<
  "div",
  {
    children?: (chunk: ReactElement) => ReactNode;
    /**
     * The string content to display and highlight terms.
     */
    content?: string;
    /**
     * The query terms to highlight in the text.
     */
    query?: RegExp | RegExp[] | string | string[];
  }
>;

export const Highlight = forwardRef<HTMLDivElement, HighlightProps>(
  ({ children = (chunk) => chunk, content, query, ...props }, ref) => {
    const chunks = useHighlightedChunks(content || "", query);

    return (
      <Box ref={ref} {...props}>
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
  },
);

Highlight.displayName = "@optiaxiom/react/Highlight";
