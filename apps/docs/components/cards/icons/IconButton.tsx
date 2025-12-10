import { type BoxProps, Group, theme } from "@optiaxiom/react";

type IconButtonProps = BoxProps & {
  intent?: "danger" | "primary" | "secondary";
};

export const IconButton = ({
  intent = "primary",
  style,
  ...props
}: IconButtonProps) => (
  <Group
    bg={intent === "danger" ? "bg.error" : "bg.default"}
    gap="16"
    p="4"
    px="8"
    rounded="sm"
    style={{
      ...(intent === "primary"
        ? { backgroundColor: theme.colors["border.focus"] }
        : intent === "secondary"
          ? {
              boxShadow: `inset 0 0 0 1px ${theme.colors["border.default"]}`,
            }
          : {}),
      ...style,
    }}
    {...props}
  />
);
