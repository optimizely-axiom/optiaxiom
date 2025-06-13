import * as RadixAvatar from "@radix-ui/react-avatar";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { IconOpal } from "../icons/IconOpal";
import { IconUserSolid } from "../icons/IconUserSolid";
import { IconUsersSolid } from "../icons/IconUsersSolid";
import * as styles from "./Avatar.css";
import { useAvatarContext } from "./AvatarContext";

export type AvatarProps = BoxProps<
  "span",
  styles.AvatarVariants & {
    /**
     * The fallback icon to display when no name or image is given.
     */
    fallback?: keyof typeof mapFallbackToIcon;
    /**
     * Use name to generate initials to show inside the avatar.
     */
    name?: string;
    /**
     * Render the image inside the avatar.
     */
    src?: string;
  }
>;

function getInitialsFromName(name: string) {
  const names = name.trim().split(" ");
  const firstName = names[0] ?? "";
  const lastName = names.length > 1 ? names[names.length - 1] : "";
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

const mapFallbackToIcon = {
  opal: null,
  team: <IconUsersSolid />,
  user: <IconUserSolid />,
};

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      children,
      className,
      colorScheme = "neutral",
      fallback = "user",
      name,
      size: sizeProp,
      src,
      ...props
    },
    ref,
  ) => {
    const context = useAvatarContext("@optiaxiom/react/Avatar");
    const size = sizeProp || context?.size || "md";

    if (fallback === "opal") {
      fallback = "user";
      src = "opal";
    }

    return (
      <Box
        asChild
        {...styles.avatar({ colorScheme, size }, className)}
        {...props}
      >
        <RadixAvatar.Root ref={ref}>
          {src && (
            <Box asChild objectFit="cover" rounded="inherit" size="full">
              {src === "opal" ? (
                <IconOpal asChild>
                  <RadixAvatar.Image alt={name ?? "Opal"} />
                </IconOpal>
              ) : (
                <RadixAvatar.Image alt={name ?? "avatar"} src={src} />
              )}
            </Box>
          )}
          <Box asChild {...styles.fallback({})}>
            <RadixAvatar.Fallback delayMs={src ? 600 : undefined}>
              {(children ?? (name ? getInitialsFromName(name) : undefined)) || (
                <Box asChild {...styles.icon({ size })}>
                  {mapFallbackToIcon[fallback]}
                </Box>
              )}
            </RadixAvatar.Fallback>
          </Box>
        </RadixAvatar.Root>
      </Box>
    );
  },
);

Avatar.displayName = "@optiaxiom/react/Avatar";
