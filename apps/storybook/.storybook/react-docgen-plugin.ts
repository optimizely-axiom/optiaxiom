// @ts-expect-error -- no types
import { getDocs } from "@optiaxiom/shared";
import { createFilter } from "@rollup/pluginutils";
import { basename, relative } from "node:path";
import { ERROR_CODES, parse } from "react-docgen";
import { displayNameHandler } from "react-docgen/dist/handlers";

export function reactDocgenPlugin() {
  const docs = getDocs();
  const filter = createFilter(
    /..\/..\/packages\/react\/dist\/.*\.js/,
    /-css\.js/,
  );

  return {
    enforce: "pre" as const,
    name: "axiom:react-docgen-plugin",
    async transform(code: string, id: string) {
      if (!filter(relative(process.cwd(), id))) {
        return;
      }

      try {
        const docgenResults = parse(code, {
          handlers: [displayNameHandler],
        });
        if (!docgenResults.length) {
          return;
        }

        docgenResults.forEach((info) => {
          const { displayName } = info;
          const docgenInfo = docs.find(
            (doc: { displayName: string }) => doc.displayName === displayName,
          );
          if (displayName) {
            const docNode = JSON.stringify(docgenInfo);
            code += `;${basename(displayName)}.__docgenInfo=${docNode}`;
          }
        });

        return code;
      } catch (err) {
        if (
          err instanceof Error &&
          "code" in err &&
          err.code === ERROR_CODES.MISSING_DEFINITION
        ) {
          return;
        }

        throw err;
      }
    },
  };
}
