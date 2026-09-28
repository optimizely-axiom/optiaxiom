/**
 * `strictNullChecks` adds `undefined` to every optional prop's type, which
 * `getPropType` can't map, so those props drop out. TypeScript 6 turns it on
 * by default.
 *
 * @type {import('typescript').CompilerOptions}
 */
export const compilerOptions = {
  esModuleInterop: true,
  strictNullChecks: false,
};

/** @type {import('react-docgen-typescript').ParserOptions} */
export const parserOptions = {
  propFilter: (prop) =>
    prop.parent
      ? prop.parent.fileName.includes("@types/react")
        ? ["defaultChecked", "defaultValue"].includes(prop.name)
        : true
      : true,
  savePropValueAsString: true,
  shouldExtractValuesFromUnion: true,
};

/**
 * @param {import('react-docgen-typescript').ComponentDoc | undefined} doc
 * @returns {Record<string, "boolean" | "function" | "number" | "object" | "string">}
 */
export const getPropTypes = (doc) =>
  Object.fromEntries(
    Object.entries(doc?.props ?? {}).flatMap(([name, value]) => {
      const type = name.startsWith("on") ? "function" : getPropType(value.type);
      return type ? [[name, type]] : [];
    }),
  );

/**
 * @param {import('react-docgen-typescript').PropItemType} type
 */
const getPropType = (type) => {
  if (type.name === "number") {
    return "number";
  } else if (type.name === "string") {
    return "string";
  } else if (
    type.name === "enum" &&
    (type.raw === "boolean" || type.raw === "Booleanish")
  ) {
    return "boolean";
  } else if (type.raw === "ReactNode") {
    return "object";
  } else if (
    type.name === "enum" &&
    type.value.find(
      ({ value }) =>
        value.startsWith("ResponsiveArray<") || value.startsWith("{ "),
    )
  ) {
    return "object";
  } else if (
    type.name === "enum" &&
    Array.isArray(type.value) &&
    (type.value.find(
      (item) => item.value === "string" || item.value === "string & {}",
    ) ||
      type.value.every(
        (item) =>
          (item.value.startsWith('"') && item.value.endsWith('"')) ||
          ["false", "true"].includes(item.value) ||
          item.value.endsWith("[]"),
      ))
  ) {
    return "string";
  } else if (
    type.name === "enum" &&
    Array.isArray(type.value) &&
    type.value.every((item) => item.value === parseInt(item.value).toString())
  ) {
    return "number";
  } else if (type.name.startsWith('"') && type.name.endsWith('"')) {
    return "string";
  }
};
