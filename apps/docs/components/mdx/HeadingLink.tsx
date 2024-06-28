import type { ComponentPropsWithRef, ReactNode } from "react";

import { Box, Heading, Text } from "@optiaxiom/react";
import { useMDXComponents } from "nextra-theme-docs";

import styles from "./HeadingLink.module.css";

export function HeadingLink({
  children,
  id,
  ...props
}: {
  children?: ReactNode;
  id?: string;
} & ComponentPropsWithRef<typeof Heading>) {
  const { h6: H6 = "h6" } = useMDXComponents();

  return (
    <Heading {...props}>
      <Box className={styles.hidden} size="0">
        {/* @ts-expect-error -- Dummy header to ensure active item in TOC gets updated */}
        <H6 id={id} tag="span" />
      </Box>

      <Box asChild className={styles.group} ml="-8" pl="8">
        <a aria-label="Permalink for this section" href={`#${id}`} id="id">
          <Box
            alignItems="center"
            className={styles.anchor}
            display="flex"
            flexDirection="row"
            ml="-32"
          >
            <wbr />
            <Text
              className={styles.pound}
              color="fg.disabled"
              display="grid"
              placeItems="center"
              rounded="md"
              shadow="sm"
              size="24"
              textAlign="center"
            >
              #
            </Text>
          </Box>
          {children}
        </a>
      </Box>
    </Heading>
  );
}
