import { fileURLToPath } from "node:url";
import docgen from "react-docgen-typescript";
import ts from "typescript";
import { expect, it } from "vitest";

import { compilerOptions, getPropTypes, parserOptions } from "./prop-types.mjs";

it("generates prop types for optional props", () => {
  const [doc] = docgen
    .withCompilerOptions(compilerOptions, parserOptions)
    .parse([fileURLToPath(new URL("fixtures/Fixture.d.ts", import.meta.url))]);

  expect(
    getPropTypes(doc),
    `react-docgen-typescript on TypeScript ${ts.version}`,
  ).toEqual({
    columns: "number",
    disabled: "boolean",
    gap: "object",
    label: "string",
    max: "number",
    onValueChange: "function",
    required: "boolean",
    size: "string",
  });
});
