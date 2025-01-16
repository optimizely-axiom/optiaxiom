import type { ComponentPropsWithRef, ReactNode } from "react";

import { Box, Heading, Text } from "@optiaxiom/react";
import { useMDXComponents } from "nextra-theme-docs";

import styles from "./HeadingLink.module.css";

export function HeadingLink({
  children,
  id,
  ...props
}: ComponentPropsWithRef<typeof Heading> & {
  children?: ReactNode;
  id?: string;
}) {
  const { h6: H6 = "h6" } = useMDXComponents();

  return (
    <Heading {...props}>
      <Box className={styles.hidden} size="0">
        {/* Dummy header to ensure active item in TOC gets updated */}
        <H6 id={id} style={{ marginTop: 0 }} />
      </Box>

      <Box asChild className={styles.group} pl="8">
        <a aria-label="Permalink for this section" href={`#${id}`} id="id">
          <Box
            alignItems="center"
            className={styles.anchor}
            display={["none", "flex"]}
            flexDirection="row"
          >
            <wbr />
            <Text
              className={styles.pound}
              color="fg.disabled"
              display="grid"
              placeItems="center"
              rounded="md"
              shadow="sm"
              size="sm"
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
