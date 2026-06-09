import type { ReactNode } from "react";
import type { Components } from "react-markdown";

import {
  Box,
  type BoxProps,
  Heading,
  Link,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
} from "@optiaxiom/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import * as styles from "./ProteusMarkdown.css";

export type ProteusMarkdownProps = BoxProps<
  "div",
  {
    /**
     * The markdown source to render. A single string (resolved upstream from a
     * literal or a `Value`/`Concat` expression).
     */
    children?: string;
  }
>;

const mapLevelToFontSize = {
  "1": "2xl",
  "2": "xl",
  "3": "lg",
  "4": "md",
} as const;
/**
 * Maps markdown heading levels (h1-h6) onto Axiom Heading levels (1-4). Markdown
 * supports six levels but Heading only supports four, so deeper levels are
 * clamped to the smallest visual size.
 */
const heading = (
  level: "1" | "2" | "3" | "4",
  Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
) =>
  function MarkdownHeading({ children }: { children?: ReactNode }) {
    return (
      <Heading
        asChild
        fontSize={mapLevelToFontSize[level]}
        fontWeight="600"
        level={level}
      >
        <Tag>{children}</Tag>
      </Heading>
    );
  };

const components: Components = {
  a: ({ children, href }) => (
    <Link href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </Link>
  ),
  blockquote: ({ children }) => (
    <Box asChild borderL="2" color="fg.secondary" px="16" py="6">
      <blockquote>{children}</blockquote>
    </Box>
  ),
  // Inline code (also the inner element of fenced blocks, which `pre` wraps).
  // `code` fires for both inline code and the inner element of fenced blocks
  // (which `pre` wraps). Both share the mono/size styling; the `pre` recipe
  // resets the foreground color so only inline code shows the accent color.
  code: ({ children }) => (
    <Box asChild {...styles.inlineCode()}>
      <code>{children}</code>
    </Box>
  ),
  em: ({ children }) => (
    <Box asChild>
      <em>{children}</em>
    </Box>
  ),
  h1: heading("1", "h1"),
  h2: heading("2", "h2"),
  h3: heading("3", "h3"),
  h4: heading("4", "h4"),
  h5: heading("4", "h5"),
  h6: heading("4", "h6"),
  hr: () => <Separator className={styles.separator} />,
  img: ({ alt, src }) =>
    typeof src === "string" ? (
      <Box asChild {...styles.inlineImage()}>
        <img alt={alt ?? ""} src={src} />
      </Box>
    ) : null,
  li: ({ children }) => (
    <Text asChild>
      <li>{children}</li>
    </Text>
  ),
  ol: ({ children }) => (
    <Box asChild {...styles.orderedList()}>
      <ol>{children}</ol>
    </Box>
  ),
  p: ({ children }) => <Text>{children}</Text>,
  // Fenced code block. react-markdown nests a `<code>` inside (styled by our
  // `code` override); this wrapper provides the block surface and resets the
  // inner code color back to the default foreground.
  pre: ({ children }) => (
    <Box asChild {...styles.code()}>
      <pre>{children}</pre>
    </Box>
  ),
  strong: ({ children }) => (
    <Box asChild display="inline" fontWeight="600">
      <strong>{children}</strong>
    </Box>
  ),
  table: ({ children }) => <Table {...styles.table()}>{children}</Table>,
  tbody: ({ children }) => <TableBody>{children}</TableBody>,
  td: ({ children }) => <TableCell>{children}</TableCell>,
  th: ({ children }) => <TableHeaderCell>{children}</TableHeaderCell>,
  thead: ({ children }) => <TableHeader>{children}</TableHeader>,
  tr: ({ children }) => <TableRow>{children}</TableRow>,
  ul: ({ children }) => (
    <Box asChild {...styles.unorderedList()}>
      <ul>{children}</ul>
    </Box>
  ),
};

/**
 * Renders markdown content (headings, paragraphs, lists, links, emphasis, code)
 * as Axiom components so generated documents inherit the design system.
 */
export function ProteusMarkdown({
  children,
  className,
  ...props
}: ProteusMarkdownProps) {
  return (
    <Box {...styles.markdown({}, className)} {...props}>
      <Markdown components={components} remarkPlugins={[remarkGfm]}>
        {children}
      </Markdown>
    </Box>
  );
}

ProteusMarkdown.displayName = "@optiaxiom/proteus/ProteusMarkdown";
