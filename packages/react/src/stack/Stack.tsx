import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import * as styles from "../box/Box.css";

type StackProps = ComponentPropsWithRef<typeof Box>;

const mapDirectionToAlign = {
  column: "stretch",
  horizontal: "center",
  row: "center",
  vertical: "stretch",
} as const;

const mapDirectionToJustify = {
  column: "center",
  horizontal: "start",
  row: "start",
  vertical: "center",
} as const;

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      alignItems,
      direction,
      flexDirection,
      gap = "md",
      items,
      justify,
      justifyContent,
      ...props
    },
    ref,
  ) => {
    items ??= alignItems;
    const dir = direction ?? flexDirection ?? "column";
    justify ??= justifyContent;
    return (
      <Box
        alignItems={
          items ??
          styles.mapResponsiveValue(dir, (value) => mapDirectionToAlign[value])
        }
        display="flex"
        flexDirection={dir}
        gap={gap}
        justifyContent={
          justify ??
          styles.mapResponsiveValue(
            dir,
            (value) => mapDirectionToJustify[value],
          )
        }
        ref={ref}
        {...props}
      />
    );
  },
);

Stack.displayName = "@optiaxiom/react/Stack";
