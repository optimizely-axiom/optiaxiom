import cssIdents from "../css-idents";

const codes = Object.fromEntries(
  Object.entries(cssIdents).map(([k, v]) => [v, k]),
);
export type Ident = (typeof cssIdents)[keyof typeof cssIdents];

export const escapeVar = (value: string) =>
  value.replaceAll(/[^A-Z0-9-_]/gi, "_");

export const generateIdentifier = (
  condition: Ident,
  modifier: Ident,
  property: Ident,
  name?: Ident | null,
  prefix = "sx",
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

Maybe add an entry for \`"${nextCode()}": "${value}"\` to "css-idents.ts"?`,
    );
  }

  return codes[value];
};

const nextCode = () => {
  let nextNumber =
    Math.max(-1, ...Object.values(codes).map((code) => parseInt(code, 36))) + 1;
  while (nextNumber.toString(36).match(/^\d+$/)) {
    nextNumber++;
  }
  return nextNumber.toString(36);
};
