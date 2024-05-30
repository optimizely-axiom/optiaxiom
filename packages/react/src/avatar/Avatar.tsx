import * as RadixAvatar from "@radix-ui/react-avatar";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Avatar.css";
import { type Recipe, recipe } from "./Avatar.recipe";

const FALLBACK_DELAY_IN_MS = 600;

type AvatarProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    alt?: string;
    children?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    name?: string;
    src?: string;
  },
  Recipe
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
  ({ alt, children, className, icon, name, src, ...props }, ref) => {
    return (
      <Box {...recipe(props)} asChild>
        <RadixAvatar.Root className={clsx(styles.base, className)} ref={ref}>
          <RadixAvatar.Image
            alt={alt}
            className={clsx(styles.image)}
            src={src}
          />
          <RadixAvatar.Fallback
            className={clsx(styles.fallback)}
            delayMs={FALLBACK_DELAY_IN_MS}
          >
            {/* TODO: Add a generic user icon, if `children` is `undefined` */}
            {icon ? icon : name ? getInitialsFromName(name) : children}
          </RadixAvatar.Fallback>
        </RadixAvatar.Root>
      </Box>
    );
  },
);

Avatar.displayName = "@optiaxiom/react/Avatar";
