import fg from "fast-glob";
import fs from "fs";
import path from "path";
import docgen from "react-docgen-typescript";
import ts from "typescript";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Build a map of type name → expanded shape string from *Doc dummy components.
 * e.g. SelectDoc (whose props are SelectOption's fields) → "SelectOption" → "{ label: string; value: string; ... }"
 *
 * Convention: a component named `FooDoc` with displayName `@optiaxiom/react/FooDoc`
 * describes the type `Foo` (the Doc suffix is stripped to get the type name).
 *
 * @param {docgen.ComponentDoc[]} docs
 * @returns {Record<string, string>}
 */
function buildTypeExpansions(docs) {
  /** @type {Record<string, string>} */
  const expansions = {};

  for (const doc of docs) {
    const match = doc.displayName.match(/^@optiaxiom\/react\/(\w+)Doc$/);
    if (!match) continue;

    const typeName = match[1];
    const props = Object.entries(doc.props)
      .filter(
        ([, prop]) =>
          prop.declarations?.length && prop.type.name !== "undefined",
      )
      .map(([name, prop]) => {
        const type = prop.type.raw || prop.type.name || "unknown";
        return `${name}${prop.required ? "" : "?"}: ${type}`;
      });

    if (props.length > 0) {
      expansions[typeName] = `{ ${props.join("; ")} }`;
    }
  }

  return expansions;
}

/**
 * Replace custom type references in a raw type string with their expanded shape.
 * e.g. "readonly SelectOption[] | SelectOption[]" → "readonly { label: string; value: string }[] | { ... }[]"
 *
 * @param {string} rawType
 * @param {Record<string, string>} expansions
 * @returns {string}
 */
function expandTypeReferences(rawType, expansions) {
  let result = rawType;
  for (const [typeName, shape] of Object.entries(expansions)) {
    result = result.replaceAll(typeName, shape);
  }
  return result;
}

function generateDocs() {
  const exportedComponents = getExportedComponentsFromSource();
  const reactSrcPath = path.resolve(__dirname, "../../react/src");
  const reactTsconfigPath = path.resolve(
    __dirname,
    "../../react/tsconfig.json",
  );

  const parser = docgen.withCustomConfig(reactTsconfigPath, {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
    shouldRemoveUndefinedFromOptional: true,
    skipChildrenPropWithoutDoc: false,
  });

  const docs = parser.parse(
    fg.globSync(path.join(reactSrcPath, "**/{*.css.ts,sprinkles.ts,*.tsx}"), {
      ignore: ["**/*.spec.*"],
    }),
  );
  const sprinkles = docs.find((doc) => doc.displayName === "sprinkles");
  if (!sprinkles) {
    throw new Error("Could not find sprinkles docgen");
  }
  // Build type expansion map from *Doc dummy components.
  // e.g. SelectDoc's props describe the shape of SelectOption,
  // so "SelectOption" → "{ label: string; value: string; ... }"
  const typeExpansions = buildTypeExpansions(docs);

  return docs
    .map(
      ({
        description,
        filePath: _filePath,
        methods: _methods,
        props,
        tags,
        ...doc
      }) => {
        const filterProps = Object.fromEntries(
          Object.entries(props)
            .filter(([, prop]) =>
              prop.parent
                ? !(
                    prop.parent.fileName.includes("@types/react") &&
                    prop.name !== "children"
                  )
                : prop.declarations?.length && prop.type.name !== "undefined",
            )
            .filter(([, prop]) => !(prop.type.name === "never"))
            .map(
              ([
                name,
                { declarations, defaultValue, description, required, ...prop },
              ]) => {
                delete prop.parent;

                // Expand custom type references in raw type strings
                if (prop.type.raw) {
                  prop.type.raw = expandTypeReferences(
                    prop.type.raw,
                    typeExpansions,
                  );
                }

                return [
                  name,
                  {
                    ...prop,
                    ...(defaultValue && { defaultValue }),
                    ...(description && { description }),
                    ...(required && { required }),
                    ...(sprinkles.props[prop.name] &&
                      sprinkles.props[prop.name]?.declarations?.[0].fileName ===
                        declarations?.[0].fileName && {
                        sprinkle: true,
                      }),
                  },
                ];
              },
            ),
        );
        return {
          ...doc,
          props: Object.values(filterProps).sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
          tags: {
            ...("asChild" in filterProps && "className" in filterProps
              ? { extends: "Box" }
              : undefined),
            ...tags,
          },
          ...(description && { description }),
        };
      },
    )
    .filter((doc) => doc.displayName.startsWith("@optiaxiom/react/"))
    .filter((doc) =>
      exportedComponents.has(doc.displayName.replace("@optiaxiom/react/", "")),
    );
}

function getExportedComponentsFromSource() {
  const reactPath = path.resolve(__dirname, "../../react");
  const pkg = JSON.parse(
    fs.readFileSync(path.join(reactPath, "package.json"), "utf-8"),
  );

  const program = ts.createProgram(
    fg.globSync(path.join(reactPath, "src/**/*.{ts,tsx}"), {
      ignore: ["**/*.spec.*"],
    }),
    {
      allowJs: true,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      target: ts.ScriptTarget.Latest,
    },
  );

  const typeChecker = program.getTypeChecker();
  const exportedComponents = new Set();

  for (const exportKey of Object.keys(pkg.exports)) {
    const sourceFile = program.getSourceFile(
      path.join(
        reactPath,
        "src",
        `${exportKey === "." ? "index" : exportKey}.ts`,
      ),
    );
    if (!sourceFile) {
      continue;
    }

    const moduleSymbol = typeChecker.getSymbolAtLocation(sourceFile);
    if (!moduleSymbol) {
      continue;
    }

    typeChecker.getExportsOfModule(moduleSymbol).forEach((exportSymbol) => {
      const name = exportSymbol.getName();
      if (
        name !== "default" &&
        !name.startsWith("__") &&
        !name.endsWith("Props")
      ) {
        exportedComponents.add(name);
      }
    });
  }

  return exportedComponents;
}

// Generate and write to file
const docs = generateDocs();
const outputDir = path.join(__dirname, "../data");
const outputPath = path.join(outputDir, "docs.json");

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(docs, null, 2));

console.log(`Generated docs.json with ${docs.length} components`);
