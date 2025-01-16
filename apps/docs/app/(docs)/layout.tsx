import type { ReactNode } from "react";

import { Layout, metadata } from "@/components/layout";

export { metadata };

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
