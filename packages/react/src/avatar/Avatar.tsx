import * as RadixAvatar from "@radix-ui/react-avatar";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Avatar.css";

const FALLBACK_DELAY_IN_MS = 600;

type AvatarProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    children?: React.ReactNode;
    className?: string;
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

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { children, className, colorScheme, icon, name, size, src, ...props },
    ref,
  ) => {
    return (
      <Box
        asChild
        className={clsx(styles.avatar({ colorScheme, size }), className)}
        {...props}
      >
        <RadixAvatar.Root ref={ref}>
          <Box asChild objectFit="cover" rounded="inherit" size="full">
            <RadixAvatar.Image alt={name} src={src} />
          </Box>
          <Box asChild className={styles.fallback({ size })}>
            <RadixAvatar.Fallback delayMs={FALLBACK_DELAY_IN_MS}>
              {/* TODO: Add a generic user icon, if `children` is `undefined` */}
              {icon ? icon : name ? getInitialsFromName(name) : children}
            </RadixAvatar.Fallback>
          </Box>
        </RadixAvatar.Root>
      </Box>
    );
  },
);

Avatar.displayName = "@optiaxiom/react/Avatar";
