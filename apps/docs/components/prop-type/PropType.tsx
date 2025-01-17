import type { PropItem, PropItemType } from "react-docgen-typescript";

import { Box, Text, Tooltip } from "@optiaxiom/react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import propsConfig from "../../props.config.mjs";

type PropTypeProps = {
  prop: PropItem;
};

export const PropType = ({ prop }: PropTypeProps) => {
  const defn = <PropDefinition prop={prop} />;
  return (
    <>
      <Text>
        <Box asChild fontFamily="mono">
          <span>
            {prop.type.raw?.startsWith(
              "ConditionalStyleWithResponsiveArray<",
            ) ? (
              <>
                <Link href="/styling/responsive-styles/">
                  <abbr className="hover:_underline" title="">
                    <span style={{ color: "var(--shiki-token-function)" }}>
                      ResponsiveValue
                    </span>
                  </abbr>
                </Link>
                <span style={{ color: "var(--shiki-color-text)" }}>&lt;</span>
                {defn}
                <span style={{ color: "var(--shiki-color-text)" }}>&gt;</span>
              </>
            ) : (
              defn
            )}
          </span>
        </Box>
      </Text>
      {prop.defaultValue && (
        <Text>
          <Box asChild color="fg.secondary" fontWeight="600">
            <strong>Default: </strong>
          </Box>
          <Box asChild fontFamily="mono">
            <span style={{ color: "var(--shiki-token-string-expression)" }}>
              {prop.defaultValue.value === "" ? '""' : prop.defaultValue.value}
            </span>
          </Box>
        </Text>
      )}
    </>
  );
};

const PropDefinition = ({ prop }: PropTypeProps) => {
  let defn: ReactNode = "";

  for (const scope of ["sprinkles", "theme"] as const) {
    if (prop.type.name === "enum") {
      for (const [key, configs] of Object.entries(propsConfig[scope])) {
        for (const config of Array.isArray(configs) ? configs : [configs]) {
          if (
            config.props.includes(prop.name) &&
            "sprinkle" in prop &&
            prop.sprinkle
          ) {
            defn = (
              <ThemeLink
                name={scope === "sprinkles" ? prop.name : key}
                {...config}
                scope={scope}
                type={prop.type}
              />
            );
            break;
          }
        }
      }
    }
  }

  if (!defn) {
    defn = <PropTypeValue type={prop.type} />;
  }

  return defn;
};

const ThemeLink = ({
  name,
  path,
  scope,
  type,
}: {
  name: string;
  path: string;
  scope: "sprinkles" | "theme";
  type: PropItemType;
}) => {
  return (
    <>
      <span style={{ color: "var(--shiki-token-keyword)" }}>typeof </span>
      <Tooltip content={propTypeRaw(type)}>
        <Link href={`/styling${path}`}>
          <abbr className="hover:_underline" title="">
            <span style={{ color: "var(--shiki-token-constant)" }}>
              {scope}
            </span>
            <span style={{ color: "var(--shiki-color-text)" }}>.{name}</span>
          </abbr>
        </Link>
      </Tooltip>
    </>
  );
};

const PropTypeValue = ({ type }: { type: PropItemType }) => {
  return (
    type.name === "enum" && type.raw && !["ReactNode"].includes(type.raw)
      ? type.raw.startsWith("ConditionalStyleWithResponsiveArray<")
        ? (type.value as Array<{ value: string }>).filter(
            (value) => !("description" in value),
          )
        : (type.value as Array<{ value: string }>)
      : [{ value: type.raw ?? type.name }]
  ).map(({ value }, index) => (
    <Fragment key={value}>
      {index > 0 && (
        <span style={{ color: "var(--shiki-token-keyword)" }}> | </span>
      )}
      <span
        style={{
          color: `var(--shiki-token-${value.startsWith('"') ? "string-expression" : value.match(/^[A-Z]/) ? "function" : "constant"})`,
        }}
      >
        {value}
      </span>
    </Fragment>
  ));
};

const propTypeRaw = (type: PropItemType) => {
  return type.name === "enum" &&
    type.raw &&
    !["ReactNode"].includes(type.raw) &&
    type.raw.startsWith("ConditionalStyleWithResponsiveArray<")
    ? (type.value as Array<{ value: string }>)
        .filter((value) => !("description" in value))
        .map(({ value }) => value)
        .join(" | ")
    : (type.raw ?? type.name);
};
