import fg from "fast-glob";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import { withCompilerOptions } from "react-docgen-typescript";
import { visit } from "unist-util-visit";

function getDocs() {
  const docs = withCompilerOptions(
    { esModuleInterop: true },
    {
      savePropValueAsString: true,
      shouldExtractValuesFromUnion: true,
    },
  ).parse(
    fg.globSync(
      "../../packages/react/src/**/{*.css.ts,sprinkles.css.ts,*.tsx}",
      {
        ignore: ["**/*.spec.*"],
      },
    ),
  );
  const sprinkles = docs.find((doc) => doc.displayName === "sprinkles");
  return docs
    .map(
      ({
        description,
        filePath,
        methods: _methods,
        props,
        tags: _tags,
        ...doc
      }) => {
        const isBox = doc.displayName === "@optiaxiom/react/Box";
        const styles = docs.filter(
          (d) => d.filePath === filePath.replace(".tsx", ".css.ts"),
        );
        const filterProps = Object.fromEntries(
          Object.entries(props)
            .filter(([, prop]) =>
              prop.parent
                ? !prop.parent.fileName.includes("@types/react")
                : prop.name === "asChild" ||
                  prop.declarations?.find(
                    (decl) => decl.fileName === filePath,
                  ) ||
                  styles.find((style) =>
                    Object.hasOwn(style.props, prop.name),
                  ) ||
                  (isBox && Object.hasOwn(sprinkles?.props ?? {}, prop.name)),
            )
            .filter(([, prop]) => !(prop.type.name === "never"))
            .map(([name, { defaultValue, description, required, ...prop }]) => {
              delete prop.declarations;
              delete prop.parent;

              return [
                name,
                {
                  ...prop,
                  ...(defaultValue && { defaultValue }),
                  ...(description && { description }),
                  ...(required && { required }),
                  ...(sprinkles.props[prop.name] &&
                    sprinkles.props[prop.name].type?.raw === prop.type.raw && {
                      sprinkle: true,
                    }),
                },
              ];
            }),
        );
        return {
          ...doc,
          props: Object.values(filterProps).sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
          ...(description && { description }),
        };
      },
    )
    .filter((doc) => doc.displayName.startsWith("@optiaxiom/react/"));
}

const docs = getDocs();

export function transformPropsTable(tree) {
  let needsImport = true;

  visit(
    tree,
    { name: "PropsTable", type: "mdxJsxFlowElement" },
    (node, index, parent) => {
      const component = node.attributes.find(
        (attr) => attr.name === "component",
      ).value.value;
      const doc = docs.find(
        (doc) => doc.displayName === `@optiaxiom/react/${component}`,
      );
      if (!doc) {
        throw new Error(`Could not find component doc: ${component}`);
      }

      const tree = fromMarkdown(
        [
          needsImport &&
            `import { PropsTableDescription } from "@/components/props-table";`,
          "",
          `### \`${component}\``,
          "",
          `<PropsTable
            propItems={${JSON.stringify(doc.props)}}
          >`,
          ...Object.values(doc.props).flatMap((prop) =>
            prop.description
              ? [
                  `<PropsTableDescription name="${prop.name}">`,
                  prop.description
                    .replaceAll(/{@link ([^\s}]+)(?:\s([^}]+))}/g, "[$2]($1)")
                    .replaceAll(/{@link ([^}]+)}/g, "[$1]($1)")
                    .replaceAll(
                      "https://optimizely-axiom.github.io/optiaxiom",
                      "",
                    )
                    .replaceAll(/@example .+/g, "\n\n")
                    .replaceAll("@see", "\n\n"),
                  "</PropsTableDescription>",
                ]
              : [],
          ),
          "</PropsTable>",
        ]
          .filter((line) => line !== false)
          .join("\n"),
        {
          extensions: [mdxjs()],
          mdastExtensions: [mdxFromMarkdown()],
        },
      );
      visit(tree, { type: "mdxJsxFlowElement" }, (node) => {
        node.data = { _mdxExplicitJsx: true };
      });
      visit(
        tree,
        { name: "PropsTable", type: "mdxJsxFlowElement" },
        (clone) => {
          clone.attributes.push(...node.attributes);
        },
      );
      parent.children.splice(index, 1, ...tree.children);

      needsImport = false;

      return index + tree.children.length;
    },
  );
}
