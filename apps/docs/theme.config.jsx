import { Heading } from "@optiaxiom/react";
import { HeadingLink } from "@/components/mdx";

import favicon from "./public/brand-logo-white.svg";

/** @type {import('nextra-theme-docs').DocsThemeConfig} */
export default {
  components: {
    h1: ({ children, ...props }) => (
      <Heading
        {...props}
        mt="8"
        fontSize="3xl"
        fontWeight="800"
        tracking="tight"
      >
        {children}
      </Heading>
    ),
    h2: ({ children, ...props }) => (
      <HeadingLink
        color="fg.accent.blue"
        fontSize="md"
        level="2"
        mb="-24"
        mt="32"
        style={{ lineHeight: "24px" }}
        {...props}
      >
        {children}
      </HeadingLink>
    ),
    h3: ({ children, ...props }) => (
      <HeadingLink mt="32" level="3" fontSize="xl" {...props}>
        {children}
      </HeadingLink>
    ),
    p: ({ children, className, ...props }) => (
      <p
        {...props}
        className={`${className} nx-mt-4 nx-leading-7 first:nx-mt-0`}
      >
        {children}
      </p>
    ),
  },
  docsRepositoryBase:
    "https://github.com/optimizely-axiom/optiaxiom/tree/main/apps/docs",
  footer: {
    text: <span>Copyright {new Date().getFullYear()} © Optimizely.</span>,
  },
  head: (
    <>
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.ico`}
      />
    </>
  ),
  logo: (
    <strong>
      <span
        className="logo"
        style={{ backgroundImage: `url(${favicon.src})` }}
      />{" "}
      Axiom Design System
    </strong>
  ),
  project: {
    link: "https://github.com/optimizely-axiom/optiaxiom",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  useNextSeoProps() {
    return {
      description: "Implementation of the Optimizely Design System",
      titleTemplate: "%s – Axiom",
    };
  },
};
