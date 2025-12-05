import fg from "fast-glob";
import fs from "fs";
import path from "path";
import docgen from "react-docgen-typescript";
import ts from "typescript";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
                ? !prop.parent.fileName.includes("@types/react")
                : prop.declarations?.length && prop.type.name !== "undefined",
            )
            .filter(([, prop]) => !(prop.type.name === "never"))
            .map(
              ([
                name,
                { declarations, defaultValue, description, required, ...prop },
              ]) => {
                delete prop.parent;

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
