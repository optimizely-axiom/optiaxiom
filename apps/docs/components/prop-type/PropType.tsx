import type { PropItem, PropItemType } from "react-docgen-typescript";

import { Code, Text } from "@optiaxiom/react";
import Link from "next/link";
import { type ComponentType, Fragment, type ReactNode } from "react";

import propsConfig from "../../props.config.mjs";

type PropTypeProps = {
  component: ComponentType;
  prop: PropItem;
};

export const PropType = ({ component, prop }: PropTypeProps) => {
  const defn = <PropDefinition component={component} prop={prop} />;
  return (
    <Text>
      <Code leading="loose" px="8">
        {prop.type.raw?.startsWith("ConditionalStyleWithResponsiveArray<") ? (
          <>
            <span style={{ color: "var(--shiki-token-function)" }}>
              ResponsiveValue
            </span>
            <span style={{ color: "var(--shiki-color-text)" }}>&lt;</span>
            {defn}
            <span style={{ color: "var(--shiki-color-text)" }}>&gt;</span>
          </>
        ) : (
          defn
        )}
      </Code>
      {prop.defaultValue && (
        <>
          {" "}
          ={" "}
          <Code leading="loose" px="8">
            <span style={{ color: "var(--shiki-token-string-expression)" }}>
              {JSON.stringify(prop.defaultValue.value)}
            </span>
          </Code>
        </>
      )}
    </Text>
  );
};

const PropDefinition = ({ component, prop }: PropTypeProps) => {
  let defn: ReactNode = "";

  if (prop.type.name === "enum") {
    for (const [key, configs] of Object.entries(propsConfig.theme)) {
      for (const config of Array.isArray(configs) ? configs : [configs]) {
        if (
          (config.props.includes(prop.name) ||
            config.props.includes(`${component.displayName}[${prop.name}]`)) &&
          "sprinkle" in prop &&
          prop.sprinkle
        ) {
          defn = <ThemeLink name={key} {...config} type={prop.type} />;
          break;
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
  type,
}: {
  name: string;
  path: string;
  type: PropItemType;
}) => {
  return (
    <>
      <span style={{ color: "var(--shiki-token-keyword)" }}>typeof </span>
      <Link href={`/styled-system${path}`}>
        <abbr className="hover:_underline" title={propTypeRaw(type)}>
          <span style={{ color: "var(--shiki-token-constant)" }}>theme</span>
          <span style={{ color: "var(--shiki-color-text)" }}>.{name}</span>
        </abbr>
      </Link>
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
