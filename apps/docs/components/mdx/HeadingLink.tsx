import type { ComponentPropsWithRef, ReactNode } from "react";

import { Box, Heading, Text } from "@optiaxiom/react";
import { HeadingAnchor } from "nextra-theme-docs";

import styles from "./HeadingLink.module.css";

export function HeadingLink({
  children,
  id,
  ...props
}: ComponentPropsWithRef<typeof Heading> & {
  children?: ReactNode;
  id?: string;
}) {
  return (
    <Heading
      className={styles.root}
      // Release history shouldn't outrank docs for words like "change".
      data-pagefind-weight={id === "changelog" ? "0.5" : undefined}
      id={id}
      {...props}
    >
      {id && (
        <Box className={styles.hidden} size="0">
          {/* Nextra's TOC highlights the item whose anchor scrolls into view */}
          <HeadingAnchor id={id} />
        </Box>
      )}

      <Box asChild className={styles.group} pl="8">
        <a aria-label="Permalink for this section" href={`#${id}`}>
          <Box
            alignItems="center"
            className={styles.anchor}
            data-pagefind-ignore
            display={["none", "flex"]}
            flexDirection="row"
          >
            <wbr />
            <Text
              className={styles.pound}
              color="fg.disabled"
              display="grid"
              fontSize="md"
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
