import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Text } from "../text";
import { Tooltip } from "../tooltip";

export type BreadcrumbPageProps = BoxProps<"span">;
export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ ...props }, ref) => {
    return (
      <Tooltip auto content={props.children}>
        <Text
          aria-current="page"
          asChild
          color="fg.default"
          fontSize="md"
          truncate
        >
          <span ref={ref} {...props} />
        </Text>
      </Tooltip>
    );
  },
);
BreadcrumbPage.displayName = "@optiaxiom/react/BreadcrumbPage";
