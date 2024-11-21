import fg from "fast-glob";
import path from "node:path";
import { withCompilerOptions } from "react-docgen-typescript";

export function getDocs({ shouldExtractValuesFromUnion = false } = {}) {
  const docs = withCompilerOptions(
    { esModuleInterop: true },
    {
      savePropValueAsString: true,
      shouldExtractValuesFromUnion,
    },
  ).parse(
    fg.globSync("../../packages/react/src/**/{*.css.ts,sprinkles.ts,*.tsx}", {
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
        filePath,
        methods: _methods,
        props,
        tags: _tags,
        ...doc
      }) => {
        const component = path.basename(doc.displayName);
        const isBox = component === "Box";
        const filterProps = Object.fromEntries(
          Object.entries(props)
            .filter(([, prop]) =>
              prop.parent
                ? !prop.parent.fileName.includes("@types/react")
                : prop.name === "asChild" ||
                  (prop.declarations?.length &&
                    prop.declarations.find(
                      (decl) =>
                        (isBox || !decl.fileName.endsWith("/Box.tsx")) &&
                        (decl.fileName === filePath ||
                          decl.fileName ===
                            filePath.replace(".tsx", ".css.ts") ||
                          decl.fileName.endsWith(`/${component}Base.tsx`) ||
                          decl.fileName.endsWith(`/${component}Base.css.ts`) ||
                          decl.fileName.includes("/Command") ||
                          decl.fileName.endsWith(`/${component}Context.ts`) ||
                          decl.fileName.includes("/Listbox") ||
                          decl.fileName.endsWith(`/${component}Root.tsx`) ||
                          decl.fileName.endsWith(`/${component}Root.css.ts`)),
                    )) ||
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
