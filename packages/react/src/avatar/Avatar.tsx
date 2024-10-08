import * as RadixAvatar from "@radix-ui/react-avatar";
import { forwardRef, useContext } from "react";

import { AvatarContext } from "../avatar-context";
import { Box, type BoxProps } from "../box";
import * as styles from "./Avatar.css";

type AvatarProps = BoxProps<
  "span",
  {
    icon?: React.ReactNode;
    name?: string;
    src?: string;
  } & styles.AvatarVariants
>;

function getInitialsFromName(name: string) {
  const names = name.trim().split(" ");
  const firstName = names[0] ?? "";
  const lastName = names.length > 1 ? names[names.length - 1] : "";
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      children,
      className,
      colorScheme = "neutral",
      icon,
      name,
      size: sizeProp,
      src,
      ...props
    },
    ref,
  ) => {
    const context = useContext(AvatarContext);
    const size = sizeProp || context?.size || "md";

    return (
      <Box
        asChild
        {...styles.avatar({ colorScheme, size }, className)}
        {...props}
      >
        <RadixAvatar.Root ref={ref}>
          {src && (
            <Box asChild objectFit="cover" rounded="inherit" size="full">
              <RadixAvatar.Image alt={name} src={src} />
            </Box>
          )}
          <Box asChild {...styles.fallback({})}>
            <RadixAvatar.Fallback delayMs={src ? 600 : undefined}>
              {/* TODO: Add a generic user icon, if `children` is `undefined` */}
              {icon ? (
                <Box asChild {...styles.icon({ size })}>
                  {icon}
                </Box>
              ) : name ? (
                getInitialsFromName(name)
              ) : (
                children
              )}
            </RadixAvatar.Fallback>
          </Box>
        </RadixAvatar.Root>
      </Box>
    );
  },
);

Avatar.displayName = "@optiaxiom/react/Avatar";
