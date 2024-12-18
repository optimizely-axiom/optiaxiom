import type { AppProps } from "next/app";

import { AxiomProvider } from "@optiaxiom/react";

import "./globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AxiomProvider>
      <Component {...pageProps} />
    </AxiomProvider>
  );
}
