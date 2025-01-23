"use client";

import { Box, Flex, Text, theme } from "@optiaxiom/react";
import cssesc from "cssesc";
import { useTheme } from "nextra-theme-docs";
import { useEffect, useState } from "react";

import { Td } from "../table";

const px = (rem: string) =>
  rem.endsWith("rem")
    ? `${parseFloat((parseFloat(rem.slice(0, -3)) * 16).toFixed(0))}px`
    : rem;

export const ScaleValue = ({
  mode,
  name,
  themeKey,
  type,
  value,
}: {
  mode?: "color";
  name: string;
  themeKey?: keyof typeof theme;
  type: "selector" | "value";
  value: Record<string, string> | string;
}) => {
  const { resolvedTheme = "light" } = useTheme();
  const [renderedTheme, setRenderedTheme] = useState("");
  useEffect(() => setRenderedTheme(resolvedTheme), [resolvedTheme]);

  const [resolvedValue, setResolvedValue] = useState(
    type === "value" ? value : undefined,
  );
  useEffect(() => {
    if (type === "selector" && typeof value === "string") {
      setResolvedValue(getStyleValues(value));
    }
  }, [renderedTheme, type, value]);

  return (
    resolvedValue !== undefined && (
      <>
        <Td
          display={
            mode === "color" && isColorType(resolvedValue)
              ? ["none", "table-cell"]
              : undefined
          }
          valign={
            mode === "color" && isColorType(resolvedValue)
              ? "middle"
              : undefined
          }
          whiteSpace="nowrap"
        >
          <Flex gap="0">
            {(typeof resolvedValue === "object"
              ? Object.entries(resolvedValue)
              : resolvedValue
                ? [[null, resolvedValue]]
                : []
            ).map(([key, value]) => (
              <Text asChild fontFamily="mono" key={key ?? value}>
                <code>
                  {key && (
                    <>
                      <span
                        style={{ color: "var(--shiki-token-css-constant)" }}
                      >
                        {key}
                      </span>
                      <span style={{ color: "var(--shiki-token-keyword)" }}>
                        :{" "}
                      </span>
                    </>
                  )}
                  <span style={{ color: "var(--shiki-token-constant)" }}>
                    {addShiki(
                      themeKey && name in theme[themeKey]
                        ? key &&
                          typeof theme[themeKey][name as never] === "object" &&
                          toCamelCase(key) in theme[themeKey][name as never]
                          ? theme[themeKey][name as never][toCamelCase(key)]
                          : theme[themeKey][name as never]
                        : value,
                    )}
                  </span>
                  <span style={{ color: "var(--shiki-color-text)" }}>
                    {key && ";"}
                  </span>
                  {themeKey &&
                  name in theme[themeKey] &&
                  !(type === "value" && value?.startsWith("var(")) ? (
                    <span style={{ color: "var(--shiki-token-comment)" }}>
                      {" /* "}
                      {value}
                      {value?.endsWith("rem") && <> ({px(value)})</>}
                      {" */"}
                    </span>
                  ) : value?.endsWith("rem") ? (
                    <span style={{ color: "var(--shiki-token-comment)" }}>
                      {" /* "}
                      {px(value)}
                      {" */"}
                    </span>
                  ) : null}
                </code>
              </Text>
            ))}
          </Flex>
        </Td>
        {mode === "color" && typeof resolvedValue !== "object" && (
          <Td display={["none", "table-cell"]}>
            <Box
              rounded="sm"
              style={{
                aspectRatio: 100 / 60,
                backgroundImage: [
                  `linear-gradient(${resolvedValue}, ${resolvedValue})`,
                  `linear-gradient(${theme.colors["bg.default"]}, ${theme.colors["bg.default"]})`,
                  `repeating-conic-gradient(color-mix(in srgb, ${theme.colors["bg.default.inverse"]} 5%, transparent) 0% 25%, transparent 0% 50%)`,
                ].join(", "),
                backgroundRepeat: "no-repeat, no-repeat, repeat",
                backgroundSize: "100% 100%, 50% 100%, 16px 16px",
                boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${theme.colors["bg.default.inverse"]} 20%, transparent)`,
              }}
              w="56"
            />
          </Td>
        )}
      </>
    )
  );
};

const addShiki = (str: null | string) =>
  str?.split(/(light-dark|px|rem|var|\(|\))/).map((part, index) =>
    part === "light-dark" || part === "var" || part === "(" || part === ")" ? (
      <span key={index} style={{ color: "var(--shiki-token-css-function)" }}>
        {part}
      </span>
    ) : part === "px" || part === "rem" ? (
      <span key={index} style={{ color: "var(--shiki-token-css-keyword)" }}>
        {part}
      </span>
    ) : (
      part
    ),
  );

function getCssRuleText(
  node: CSSRule | CSSStyleSheet | Document,
  selector: string,
): false | string {
  if (node instanceof Document) {
    for (const sheet of node.styleSheets) {
      const result = getCssRuleText(sheet, selector);
      if (result) {
        return result;
      }
    }
  } else if (node instanceof CSSGroupingRule || node instanceof CSSStyleSheet) {
    for (const cssRule of node.cssRules) {
      const result = getCssRuleText(cssRule, selector);
      if (result) {
        return result;
      }
    }
  } else if (node instanceof CSSStyleRule && node.selectorText == selector) {
    return node.style.cssText;
  }

  return false;
}

const getStyleValues = (selector: string) => {
  const style = selector.startsWith("var(")
    ? `property: ${selector}`
    : selector
        .split(" ")
        .map((part) =>
          getCssRuleText(document, `.${cssesc(part, { isIdentifier: true })}`),
        )
        .join("\n");
  if (!style) {
    throw new Error("Could not parse style for selector");
  }

  const styles = Object.fromEntries(
    style
      .split(/;\s?/)
      .filter((line) => line)
      .map((line) => {
        const [key, ...rest] = line.split(": ");
        const value = rest.join(": ");
        if (value.startsWith("var(")) {
          const computedValue = window
            .getComputedStyle(document.body)
            .getPropertyValue(value.slice("var(".length, -")".length));
          return [key, computedValue];
        }
        return [key, value];
      }),
  );

  if ("border-top-width" in styles) {
    return { border: styles["border-top-width"] };
  } else if ("margin-top" in styles) {
    return { margin: styles["margin-top"] };
  } else if ("padding-top" in styles) {
    return { padding: styles["padding-top"] };
  }

  return selector.startsWith("var(") ? styles["property"] : styles;
};

const isColorType = (value: unknown) =>
  typeof value === "string" &&
  (value.startsWith("#") || value.startsWith("light-dark("));

const toCamelCase = <T extends null | string>(str: T) =>
  str?.replace(/-(\w)/g, (_, c) => c.toUpperCase()) as T;
