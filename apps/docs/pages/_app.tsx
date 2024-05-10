import type { AppProps } from "next/app";

import { useEffect } from "react";

import "./globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  /**
   * Manually remove background-color rule from top navbar nextra theme.
   * For some reason css isn't able to override the color.
   */
  useEffect(() => {
    for (const sheet of document.styleSheets) {
      for (const layerRule of sheet.cssRules) {
        if (
          layerRule instanceof CSSLayerBlockRule &&
          layerRule.name === "theme"
        ) {
          for (const supportsRule of layerRule.cssRules) {
            if (supportsRule instanceof CSSSupportsRule) {
              for (const [index, cssRule] of Object.entries(
                supportsRule.cssRules,
              )) {
                if (
                  cssRule instanceof CSSStyleRule &&
                  cssRule.selectorText.includes(".nextra-nav-container-blur") &&
                  cssRule.selectorText.includes("dark")
                ) {
                  supportsRule.deleteRule(index as unknown as number);
                }
              }
            }
          }
        }
      }
    }
  }, []);

  return <Component {...pageProps} />;
}
