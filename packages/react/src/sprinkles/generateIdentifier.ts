import cssIdents from "../css-idents";

const codes = Object.fromEntries(
  Object.entries(cssIdents).map(([k, v]) => [v, k]),
);
export type Ident = (typeof cssIdents)[keyof typeof cssIdents];

const prefix = "sx";

export const escapeVar = (value: string) =>
  value.replaceAll(/[^A-Z0-9-_]/gi, "_");

export const generateIdentifier = (
  condition: Ident,
  modifier: Ident,
  property: Ident,
  name?: Ident,
) => {
  return process.env.NODE_ENV === "production"
    ? [
        prefix,
        ...[condition, modifier, property, name === property ? "" : name ?? ""]
          .filter(Boolean)
          .map(hash),
      ].join("")
    : [
        [condition, modifier, prefix].filter(Boolean).join(":"),
        property,
        name === property ? "" : name,
      ]
        .filter(Boolean)
        .join("-");
};

const hash = (value: string) => {
  if (!(value in codes)) {
    throw new Error(
      `Could not find short code for value: "${value}".

Maybe add an entry for \`"${(Object.keys(codes).length + 100).toString(36)}": "${value}"\` to "css-idents.ts"?`,
    );
  }

  return codes[value];
};
