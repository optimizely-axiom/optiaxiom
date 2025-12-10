import { Box, type BoxProps, theme } from "@optiaxiom/react";

type IconTextProps = BoxProps & {
  intent?: "danger" | "primary" | "secondary";
};

export const IconText = ({
  intent = "primary",
  style,
  ...props
}: IconTextProps) => (
  <Box
    p="2"
    rounded="sm"
    style={{
      backgroundColor:
        theme.colors[
          intent === "primary"
            ? "border.control"
            : intent === "secondary"
              ? "border.default"
              : "bg.error.subtle"
        ],
      ...style,
    }}
    {...props}
  />
);
