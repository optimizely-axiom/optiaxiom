import fg from "fast-glob";
import fs from "fs";
import path from "path";
import docgen from "react-docgen-typescript";
import ts from "typescript";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @typedef {import("../src/getDocs.mjs").Field} Field
 * @typedef {import("../src/getDocs.mjs").Properties} Properties
 */

/**
 * Read the *Doc dummy components, which describe a type by declaring its
 * public fields as props. Returns, keyed by type name, each type's field
 * names and its expanded shape string.
 * e.g. SelectOptionDoc (whose props are SelectOption's fields) → "SelectOption" → "{ label: string; value: string; ... }"
 *
 * Convention: a component named `FooDoc` with displayName `@optiaxiom/react/FooDoc`
 * describes the type `Foo` (the Doc suffix is stripped to get the type name).
 * Fields it omits (internal ones like `CommandOption.parentOption`) stay out
 * of the docs.
 *
 * @param {docgen.ComponentDoc[]} docs
 */
function buildDocTypes(docs) {
  /** @type {Record<string, string>} */
  const expansions = {};
  /** @type {Map<string, Set<string>>} */
  const fields = new Map();

  for (const doc of docs) {
    const match = doc.displayName.match(/^@optiaxiom\/react\/(\w+)Doc$/);
    if (!match?.[1]) continue;

    const props = Object.values(doc.props).filter(
      (prop) => prop.declarations?.length && prop.type.name !== "undefined",
    );
    if (props.length > 0) {
      expansions[match[1]] = `{ ${props
        .map((prop) => {
          const type = prop.type.raw || prop.type.name || "unknown";
          // Quote names that aren't identifiers, like `aria-label`.
          const name = /^[A-Za-z_$][\w$]*$/.test(prop.name)
            ? prop.name
            : JSON.stringify(prop.name);
          return `${name}${prop.required ? "" : "?"}: ${type}`;
        })
        .join("; ")} }`;
      fields.set(match[1], new Set(props.map((prop) => prop.name)));
    }
  }

  return { expansions, fields };
}

/**
 * Describe the fields of object-typed props (`options: SelectOption[]`) one
 * level deep, since docgen only gives a prop's type as a string. Fields are
 * formatted by docgen, the same as props. Returns `(filePath, componentName,
 * propName) => properties | undefined`.
 *
 * @param {ts.Program} program
 * @param {docgen.Parser} parser
 * @param {string} srcPath
 * @param {ReturnType<typeof buildDocTypes>} docTypes
 */
function createPropertiesResolver(program, parser, srcPath, docTypes) {
  const checker = program.getTypeChecker();

  // TypeScript file names always use `/`.
  const ownPrefix = `${srcPath.split(path.sep).join("/")}/`;
  /** @param {ts.Symbol} symbol */
  const isOwn = (symbol) =>
    !!symbol.declarations?.length &&
    symbol.declarations.every((decl) =>
      decl.getSourceFile().fileName.startsWith(ownPrefix),
    );
  /** @type {Map<string, ts.Type | undefined>} */
  const propsTypes = new Map();

  /**
   * The single object type a prop holds directly or as array elements, e.g.
   * `readonly SelectOption[] | SelectOption[]` → `SelectOption`. Primitive
   * members beside it (`string | Item`, `(number | Mark)[]`) set `union`.
   *
   * @param {ts.Type} type
   */
  const getObjectType = (type) => {
    // Optional props add `undefined`.
    const members = (type.isUnion() ? type.types : [type]).filter(
      (member) => !(member.flags & ts.TypeFlags.Undefined),
    );
    const array =
      members.length > 0 &&
      members.every((member) => checker.isArrayType(member));
    if (!array && members.some((member) => checker.isArrayType(member))) {
      return;
    }
    const elements = members.flatMap((member) => {
      const element = array
        ? checker.getTypeArguments(/** @type {ts.TypeReference} */ (member))[0]
        : member;
      return element?.isUnion() ? element.types : element ? [element] : [];
    });
    /** @param {ts.Type} member */
    const isObject = (member) =>
      !!(member.flags & (ts.TypeFlags.Object | ts.TypeFlags.Intersection)) &&
      member.getCallSignatures().length === 0 &&
      !checker.isArrayType(member);
    const objects = [...new Set(elements.filter(isObject))];
    const [element] = objects;
    if (
      !element ||
      objects.length > 1 ||
      !elements.every(
        (member) =>
          isObject(member) ||
          // Only members the MCP parser reads as JSON Schema: it takes any
          // other member string for the object.
          member.flags &
            (ts.TypeFlags.BooleanLike |
              ts.TypeFlags.Null |
              ts.TypeFlags.Number |
              ts.TypeFlags.NumberLiteral |
              ts.TypeFlags.String |
              ts.TypeFlags.StringLiteral),
      )
    ) {
      return;
    }
    const properties = checker.getPropertiesOfType(element);
    if (properties.length === 0 || !properties.every(isOwn)) {
      return;
    }
    return {
      array,
      element,
      union: elements.some((member) => !isObject(member)),
    };
  };

  /**
   * A field of an object type in docgen's format.
   *
   * @param {ts.Symbol} field
   * @returns {docgen.PropItem}
   */
  const getField = (field) => {
    const { fullComment, tags } = parser.findDocComment(field);
    const required = !(field.flags & ts.SymbolFlags.Optional);
    // Not `getDocgenType(type, required)`: for an optional type it strips the
    // first ` | undefined`, which can sit inside a callback's parameters.
    // TypeScript prints `undefined` last, so strip it from the end instead.
    const type = parser.getDocgenType(checker.getTypeOfSymbol(field), true);
    /** @param {string} text */
    const defined = (text) =>
      required ? text : text.replace(/ \| undefined$/, "");
    return {
      defaultValue: tags.default ? { value: tags.default } : null,
      description: fullComment,
      name: field.getName(),
      required,
      type: {
        ...type,
        name: defined(type.name),
        ...(type.raw && { raw: defined(type.raw) }),
        ...(Array.isArray(type.value) && {
          value: type.value.filter(
            (/** @type {{ value: string }} */ member) =>
              required || member.value !== "undefined",
          ),
        }),
      },
    };
  };

  /**
   * The props type of a component exported from `filePath`.
   *
   * @param {string} filePath
   * @param {string} componentName
   */
  const getPropsType = (filePath, componentName) => {
    const key = `${filePath}#${componentName}`;
    if (!propsTypes.has(key)) {
      const sourceFile = program.getSourceFile(filePath);
      const moduleSymbol =
        sourceFile && checker.getSymbolAtLocation(sourceFile);
      const component =
        moduleSymbol &&
        checker
          .getExportsOfModule(moduleSymbol)
          .find((symbol) => symbol.getName() === componentName);
      const propsParam =
        component &&
        checker
          .getTypeOfSymbol(component)
          .getCallSignatures()[0]
          ?.getParameters()[0];
      propsTypes.set(key, propsParam && checker.getTypeOfSymbol(propsParam));
    }
    return propsTypes.get(key);
  };

  /**
   * @param {string} filePath
   * @param {string} componentName
   * @param {string} propName
   * @returns {Properties | undefined}
   */
  return (filePath, componentName, propName) => {
    const prop = getPropsType(filePath, componentName)?.getProperty(propName);
    if (!prop) {
      return;
    }

    const objectType = getObjectType(checker.getTypeOfSymbol(prop));
    if (!objectType) {
      return;
    }

    const typeSymbol =
      objectType.element.aliasSymbol ?? objectType.element.getSymbol();
    const name =
      typeSymbol && isOwn(typeSymbol) && !typeSymbol.getName().startsWith("__")
        ? typeSymbol.getName()
        : undefined;
    // A type's own shape isn't spelled out inside its fields.
    const expansions = Object.fromEntries(
      Object.entries(docTypes.expansions).filter(([type]) => type !== name),
    );
    // A `*Doc` lists its type's public fields; other types hide theirs with
    // `@internal` or `@private`.
    const documented = name ? docTypes.fields.get(name) : undefined;
    const fields = checker
      .getPropertiesOfType(objectType.element)
      .filter((field) =>
        documented
          ? documented.has(field.getName())
          : !field
              .getJsDocTags(checker)
              .some((tag) => tag.name === "internal" || tag.name === "private"),
      )
      .map(getField)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((field) => [field.name, toField(field, expansions)]);
    if (fields.length === 0) {
      return;
    }
    return {
      ...(objectType.array && { array: /** @type {const} */ (true) }),
      fields: Object.fromEntries(fields),
      ...(name && { name }),
      ...(objectType.union && { union: /** @type {const} */ (true) }),
    };
  };
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
    // Whole words only: `SelectOption` must not match `SelectOptionGroup`.
    result = result.replace(new RegExp(`\\b${typeName}\\b`, "g"), () => shape);
  }
  return result;
}

function generateDocs() {
  const reactPath = path.resolve(__dirname, "../../react");
  const reactSrcPath = path.join(reactPath, "src");
  const reactTsconfigPath = path.join(reactPath, "tsconfig.json");
  const { config } = ts.readConfigFile(reactTsconfigPath, ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    reactPath,
    {},
    reactTsconfigPath,
  );

  const filePaths = fg.globSync(
    path.join(reactSrcPath, "**/{*.css.ts,sprinkles.ts,*.tsx}"),
    { ignore: ["**/*.spec.*"] },
  );
  const entryFiles = getEntryFiles(reactPath);
  // One program serves docgen, the props resolver and the export scan:
  // building it is most of this script's run time.
  const program = ts.createProgram(
    [...filePaths, ...entryFiles.values()],
    options,
  );
  const { entryPoints, exportedComponents, sources } =
    getExportedComponentsFromSource(program, entryFiles);

  /** @type {docgen.ParserOptions} */
  const parserOptions = {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
    shouldRemoveUndefinedFromOptional: true,
    skipChildrenPropWithoutDoc: false,
  };
  const parser = docgen.withCompilerOptions(options, parserOptions);
  const docs = parser.parseWithProgramProvider(filePaths, () => program);
  const sprinkles = docs.find((doc) => doc.displayName === "sprinkles");
  if (!sprinkles) {
    throw new Error("Could not find sprinkles docgen");
  }
  const docTypes = buildDocTypes(docs);
  const getProperties = createPropertiesResolver(
    program,
    new docgen.Parser(program, parserOptions),
    reactSrcPath,
    docTypes,
  );

  return docs
    .map(
      ({ description, filePath, methods: _methods, props, tags, ...doc }) => {
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
            .map(([name, prop]) => {
              const sprinkle =
                sprinkles.props[prop.name] &&
                sprinkles.props[prop.name]?.declarations?.[0].fileName ===
                  prop.declarations?.[0].fileName;
              const properties = sprinkle
                ? undefined
                : getProperties(
                    filePath,
                    doc.displayName.replace("@optiaxiom/react/", ""),
                    name,
                  );

              return [
                name,
                {
                  ...toField(prop, docTypes.expansions),
                  name: prop.name,
                  ...(properties && { properties }),
                  ...(sprinkle && { sprinkle: true }),
                },
              ];
            }),
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
    .map((doc) => {
      const name = doc.displayName.replace("@optiaxiom/react/", "");
      const entryPoint = entryPoints.get(name);
      return {
        ...doc,
        ...(entryPoint && { entryPoint }),
        source: sources.get(name),
      };
    })
    .filter((doc) => doc.displayName.startsWith("@optiaxiom/react/"))
    .filter((doc) =>
      exportedComponents.has(doc.displayName.replace("@optiaxiom/react/", "")),
    );
}

/**
 * The source file of each package export, keyed by export path (`"."`,
 * `"./unstable"`): `src/<entry>.ts`, else `src/<entry>/index.ts`.
 *
 * @param {string} reactPath
 * @returns {Map<string, string>}
 */
function getEntryFiles(reactPath) {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(reactPath, "package.json"), "utf-8"),
  );
  /** @type {Map<string, string>} */
  const entryFiles = new Map();
  for (const exportKey of Object.keys(pkg.exports)) {
    const entry = exportKey === "." ? "index" : exportKey;
    const file = [
      path.join(reactPath, "src", `${entry}.ts`),
      path.join(reactPath, "src", entry, "index.ts"),
    ].find((candidate) => fs.existsSync(candidate));
    if (file) {
      entryFiles.set(exportKey, file);
    }
  }
  return entryFiles;
}

/**
 * @param {ts.Program} program
 * @param {Map<string, string>} entryFiles
 */
function getExportedComponentsFromSource(program, entryFiles) {
  const typeChecker = program.getTypeChecker();
  /** @type {Map<string, string>} */
  const entryPoints = new Map();
  const exportedComponents = new Set();
  /** @type {Map<string, string>} */
  const sources = new Map();
  /** @param {string} source */
  const rank = (source) =>
    source === "@optiaxiom/react"
      ? 0
      : source === "@optiaxiom/react/unstable"
        ? 1
        : 2;

  for (const [exportKey, file] of entryFiles) {
    const sourceFile = program.getSourceFile(file);
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
        const source =
          exportKey === "."
            ? "@optiaxiom/react"
            : `@optiaxiom/react/${exportKey.slice(2)}`;
        // The narrowest entry that exports the component, for consumers who
        // skip the barrel. `unstable` is the only entry for its components.
        if (exportKey !== "." && exportKey !== "./unstable") {
          entryPoints.set(name, source);
        }
        // Where the component is imported from by default: the barrel, else
        // `unstable`, else its own entry (`RichTextEditor` from `editor`).
        const current = sources.get(name);
        if (!current || rank(source) < rank(current)) {
          sources.set(name, source);
        }
      }
    });
  }

  return { entryPoints, exportedComponents, sources };
}

/**
 * A docgen prop or field's documentation, with documented types in its raw
 * type string spelled out.
 *
 * @param {docgen.PropItem} prop
 * @param {Record<string, string>} expansions
 * @returns {Field}
 */
function toField({ defaultValue, description, required, type }, expansions) {
  return {
    ...(defaultValue && { defaultValue }),
    ...(description && { description }),
    ...(required && { required }),
    type: type.raw
      ? { ...type, raw: expandTypeReferences(type.raw, expansions) }
      : type,
  };
}

// Generate and write to file
const docs = generateDocs();
const outputDir = path.join(__dirname, "../data");
const outputPath = path.join(outputDir, "docs.json");

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(docs, null, 2));

console.log(`Generated docs.json with ${docs.length} components`);
