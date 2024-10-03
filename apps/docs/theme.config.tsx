import { HeadingLink } from "@/components/mdx";
import { Heading } from "@optiaxiom/react";
import { type DocsThemeConfig, useConfig } from "nextra-theme-docs";

export default {
  components: {
    h1: ({ ...props }) => (
      <Heading
        {...props}
        fontSize="4xl"
        fontWeight="800"
        mt="8"
        tracking="tight"
      />
    ),
    h2: ({ ...props }) => (
      <HeadingLink
        color="fg.accent.blue"
        fontSize="md"
        level="2"
        mb="-24"
        mt="32"
        style={{ lineHeight: "24px" }}
        {...props}
      />
    ),
    h3: ({ ...props }) => (
      <HeadingLink fontSize="xl" level="3" mt="32" {...props} />
    ),
    p: ({ ...props }) => (
      <p
        {...props}
        className={`${("className" in props && props.className) || ""} [&:not(:first-child)]:_mt-4 _leading-7`}
      />
    ),
  },
  docsRepositoryBase:
    "https://github.com/optimizely-axiom/optiaxiom/tree/main/apps/docs",
  footer: {
    content: <span>Copyright {new Date().getFullYear()} © Optimizely.</span>,
  },
  head: function useHead() {
    const { frontMatter, title: pageTitle } = useConfig();
    return (
      <>
        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.ico`}
          rel="shortcut icon"
          type="image/x-icon"
        />
        <meta
          content={frontMatter.title || `${pageTitle} \u2013 Axiom`}
          property="og:title"
        />
        <meta
          content={
            frontMatter.description ||
            "Implementation of the Optimizely Design System"
          }
          property="og:description"
        />
      </>
    );
  },
  logo: (
    <strong className="logo">
      <span>
        <svg
          fill="currentColor"
          height="296"
          viewBox="0 0 296 296"
          width="296"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 123.07 154.66 L 123.07 172.35 C 136.153 172.334 148.696 167.13 157.948 157.879 C 167.199 148.627 172.404 136.084 172.42 123 L 154.78 123 C 154.767 131.402 151.42 139.454 145.474 145.39 C 139.529 151.326 131.471 154.66 123.07 154.66 Z M 123.07 220.96 C 136.065 220.96 148.529 215.797 157.718 206.608 C 166.907 197.419 172.07 184.956 172.07 171.96 L 154.5 171.96 C 154.497 180.297 151.186 188.292 145.292 194.188 C 139.399 200.085 131.407 203.402 123.07 203.41 C 114.832 203.263 106.982 199.888 101.209 194.01 C 95.435 188.133 92.2 180.224 92.2 171.985 C 92.2 163.747 95.435 155.837 101.209 149.96 C 106.982 144.083 114.832 140.707 123.07 140.56 L 123.07 123.01 C 110.074 122.992 97.603 128.137 88.401 137.313 C 79.199 146.489 74.018 158.945 74 171.94 C 73.981 184.936 79.126 197.406 88.302 206.609 C 97.478 215.811 109.934 220.991 122.93 221.01 L 123.07 221.01 Z M 123.07 105.44 L 123.07 123 C 136.065 123 148.529 117.838 157.718 108.649 C 166.907 99.459 172.07 86.996 172.07 74 L 154.5 74 C 154.494 82.335 151.182 90.328 145.289 96.222 C 139.396 102.117 131.405 105.432 123.07 105.44 Z M 172.37 105.44 L 172.37 123 C 185.366 123 197.829 117.838 207.018 108.649 C 216.208 99.459 221.37 86.996 221.37 74 L 203.78 74 C 203.775 82.332 200.465 90.321 194.576 96.215 C 188.688 102.109 180.702 105.427 172.37 105.44 Z M 296 148 C 296 229.738 229.738 296 148 296 C 66.262 296 0 229.738 0 148 C 0 66.262 66.262 0 148 0 C 229.738 0 296 66.262 296 148 Z" />
        </svg>
      </span>
      Axiom Design System
    </strong>
  ),
  project: {
    link: "https://github.com/optimizely-axiom/optiaxiom",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
} satisfies DocsThemeConfig;
