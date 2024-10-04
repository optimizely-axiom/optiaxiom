import clsx from "clsx";

/**
 * Handle merging of classNames generated from sprinkle props by removing
 * classNames corresponding to overridden/duplicated css properties.
 */
export function createSprinklesMerge<P extends object>(
  sprinkles: (props: P) => string,
  ...properties: Array<{
    styles: Record<
      string,
      | {
          values: Record<
            string,
            { conditions?: Record<string, string>; defaultClass: string }
          >;
        }
      | { mappings: string[] }
    >;
  }>
) {
  const classNameToPropertyMapping: Record<string, string> = {};
  const sprinklesToPropertyMapping: Record<string, string[]> = {};
  for (const [name, definition] of Object.entries({
    ...properties[0]?.styles,
    ...properties[1]?.styles,
  })) {
    if ("mappings" in definition) {
      sprinklesToPropertyMapping[name] = definition.mappings;
    } else {
      sprinklesToPropertyMapping[name] = [name];
      for (const value of Object.values(definition.values)) {
        classNameToPropertyMapping[value.defaultClass] = name;
        if ("conditions" in value && value.conditions) {
          for (const className of Object.values(value.conditions)) {
            classNameToPropertyMapping[className] = name;
          }
        }
      }
    }
  }

  return function sprinklesMerge(
    className: string | undefined,
    sprinkleProps: P,
  ) {
    const parsedClassName = (className ?? "")
      .split(" ")
      .reduce<Record<string, string[]>>(
        (result, className) => {
          className = className.trim();
          if (!className) {
            return result;
          }

          if (className in classNameToPropertyMapping) {
            result[classNameToPropertyMapping[className]] =
              result[classNameToPropertyMapping[className]] || [];
            result[classNameToPropertyMapping[className]].push(className);
          } else {
            result._.push(className);
          }

          return result;
        },
        { _: [] },
      );
    for (const [key, value] of Object.entries(sprinkleProps)) {
      for (const name of sprinklesToPropertyMapping[key]) {
        // @ts-expect-error -- too complex
        parsedClassName[name] = [sprinkles({ [key]: value })];
      }
    }
    return clsx(...new Set(Object.values(parsedClassName).flat()));
  };
}
