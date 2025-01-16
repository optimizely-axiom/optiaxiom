import type { MDXComponents } from "nextra/mdx-components";
import type { ReactNode } from "react";

import { Code, Heading } from "@optiaxiom/react";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";

import { HeadingLink } from "./components/mdx";

const themeComponents = getThemeComponents();

import styles from "./mdx-components.module.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...themeComponents,
    code: (props: { children?: ReactNode }) =>
      typeof props.children === "string" ? (
        <Code {...props} />
      ) : (
        <code className="nextra-code" {...props} />
      ),
    h1: ({ color: _color, ...props }) => (
      <Heading {...props} className={styles.heading} fontSize="4xl" mt="8" />
    ),
    h2: ({ color: _color, ...props }) => (
      <HeadingLink
        className={styles.secondaryHeading}
        color="fg.information"
        fontSize="md"
        level="2"
        mt="32"
        {...props}
      />
    ),
    h3: ({ color: _color, ...props }) => (
      <HeadingLink fontSize="xl" level="3" mt="32" {...props} />
    ),
    h4: ({ color: _color, ...props }) => (
      <HeadingLink fontSize="lg" level="4" mt="24" {...props} />
    ),
    p: ({ ...props }) => (
      <p
        {...props}
        className={`${("className" in props && props.className) || ""} x:not-first:mt-4`}
      />
    ),
    ...components,
  };
}
