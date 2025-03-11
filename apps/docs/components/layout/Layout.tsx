import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AxiomProvider, Badge, tokens } from "@optiaxiom/react";
import { Footer, Navbar, Layout as NextraLayout } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";

import pkg from "../../../../packages/react/package.json";
import "./Layout.css";

export const metadata: Metadata = {
  openGraph: {
    description: "React implementation of Optimizely's Axiom Design System",
  },
  title: {
    default: "Optimizely Design System",
    template: "%s \u2013 Axiom",
  },
};

export async function Layout({ children }: { children: ReactNode }) {
  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <Head
        backgroundColor={{
          dark: tokens.colors["bg.page"].match(/,\s?(#\w+)/)?.[1],
          light: tokens.colors["bg.page"].match(/\((#\w+)/)?.[1],
        }}
      >
        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.ico`}
          rel="shortcut icon"
          type="image/x-icon"
        />
      </Head>
      <body>
        <AxiomProvider>
          <NextraLayout
            docsRepositoryBase="https://github.com/optimizely-axiom/optiaxiom/tree/main/apps/docs"
            footer={<Footer>Copyright 2024-present © Optimizely.</Footer>}
            navbar={
              <Navbar
                logo={
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
                }
                projectLink="https://github.com/optimizely-axiom/optiaxiom"
              >
                <Badge
                  asChild
                  className="version"
                  intent="success"
                  variant="strong"
                >
                  <a href="https://www.npmjs.com/package/@optiaxiom/react">
                    v{pkg.version}
                  </a>
                </Badge>
              </Navbar>
            }
            pageMap={await getPageMap()}
            sidebar={{
              defaultMenuCollapseLevel: 1,
            }}
          >
            {children}
          </NextraLayout>
        </AxiomProvider>
      </body>
    </html>
  );
}
