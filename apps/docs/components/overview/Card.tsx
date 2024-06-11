import type { ComponentPropsWithRef, ReactNode } from "react";

import { Box, Flex } from "@optiaxiom/react";
import { Card as NextraCard } from "nextra-theme-docs";

export function Card({
  children,
  href,
  title,
  ...props
}: {
  children: ReactNode;
  href: string;
  title: string;
} & ComponentPropsWithRef<typeof Flex>) {
  return (
    <NextraCard href={href} icon={null} image title={title}>
      <Flex
        bg="surface"
        className="nx-pointer-events-none"
        flexDirection="row"
        h="128"
        justifyContent="center"
        w="full"
      >
        <Box {...props}>{children}</Box>
      </Flex>
    </NextraCard>
  );
}
