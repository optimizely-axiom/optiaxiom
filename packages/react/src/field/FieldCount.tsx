import { Box, type BoxProps } from "../box";
import { useMessages } from "../locale";
import { VisuallyHidden } from "../visually-hidden";

export type FieldCountProps = BoxProps<
  "span",
  {
    /**
     * The number of characters in the input.
     */
    length: number;
    /**
     * The input's `maxLength`.
     */
    maxLength: number;
  }
>;

export const FieldCount = ({
  length,
  maxLength,
  ...props
}: FieldCountProps) => {
  const messages = useMessages();

  return (
    <Box asChild flex="none" ml="auto" {...props}>
      <span>
        <span aria-hidden="true">
          {length}/{maxLength}
        </span>
        <VisuallyHidden>
          {messages["{count} of {max} characters"](length, maxLength)}
        </VisuallyHidden>
        {/* Typing stops silently at `maxLength`, so say so out loud. */}
        <VisuallyHidden role="status">
          {length >= maxLength ? messages["Character limit reached"] : null}
        </VisuallyHidden>
      </span>
    </Box>
  );
};

FieldCount.displayName = "@optiaxiom/react/FieldCount";
