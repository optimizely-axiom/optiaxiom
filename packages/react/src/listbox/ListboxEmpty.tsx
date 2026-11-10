import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useMessages } from "../locale";

export type ListboxEmptyProps = BoxProps;

/**
 * @group Listbox
 */
export const ListboxEmpty = forwardRef<HTMLDivElement, ListboxEmptyProps>(
  ({ children, ...props }, ref) => {
    const messages = useMessages();
    return (
      <Box
        alignItems="center"
        aria-hidden
        color="fg.tertiary"
        display="flex"
        flexDirection="column"
        fontSize="md"
        p="10"
        ref={ref}
        {...props}
      >
        {/* Not `??`: `empty={null}` hides the message. */}
        {children === undefined ? messages["No results found."] : children}
      </Box>
    );
  },
);

ListboxEmpty.displayName = "@optiaxiom/react/ListboxEmpty";
