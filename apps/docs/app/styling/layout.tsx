import type { ReactNode } from "react";

/**
 * Root layout for the `/styling/*` redirects, which sit outside `(docs)` so
 * they stay out of the docs page map. Next requires every page to have one.
 */
export default function StylingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
