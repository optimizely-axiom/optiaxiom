import type { ReactNode } from "react";

import { Grid } from "@optiaxiom/react";
import { Card as NextraCard } from "nextra-theme-docs";

export function Card({
  children,
  href,
  title,
}: {
  children: ReactNode;
  href: string;
  title: string;
}) {
  return (
    <NextraCard href={href} icon={null} image title={title}>
      <Grid
        bg="surface"
        className="nx-pointer-events-none"
        h="128"
        placeItems="center"
        w="full"
      >
        {children}
      </Grid>
    </NextraCard>
  );
}
