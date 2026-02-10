import { createFilter } from "@rollup/pluginutils";
import { basename, relative } from "node:path";
import { ERROR_CODES, parse } from "react-docgen";
import { builtinHandlers } from "react-docgen";

export function reactDocgenPlugin() {
  const filter = createFilter(
    /..\/..\/packages\/react\/dist\/.*\.js/,
    /-css\.js/,
  );

  let docs: Awaited<
    ReturnType<(typeof import("@optiaxiom/shared"))["getDocs"]>
  > | null = null;

  return {
    enforce: "pre" as const,
    name: "axiom:react-docgen-plugin",
    async transform(code: string, id: string) {
      if (!filter(relative(process.cwd(), id))) {
        return;
      }

      if (!docs) {
        const { getDocs } = await import("@optiaxiom/shared");
        docs = getDocs();
      }

      try {
        const docgenResults = parse(code, {
          handlers: [builtinHandlers.displayNameHandler],
        });
        if (!docgenResults.length) {
          return;
        }

        docgenResults.forEach((info) => {
          const { displayName } = info;
          const docgenInfo = docs?.find(
            (doc: { displayName: string }) => doc.displayName === displayName,
          );
          if (displayName && docgenInfo) {
            const isBox = displayName.endsWith("/Box");
            const docNode = JSON.stringify({
              ...docgenInfo,
              props: docgenInfo.props.filter((prop) => isBox || !prop.sprinkle),
            });
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
