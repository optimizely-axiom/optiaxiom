import clsx from "clsx";

/**
 * Handle merging of classNames generated from sprinkle props by removing
 * classNames corresponding to overridden/duplicated css properties.
 */
export function createSprinklesMerge(
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

  return function sprinklesMerge(...classNames: Array<string | undefined>) {
    let parsedClassName: Record<string, string[]> = { _: [] };
    while (classNames.length) {
      const className = classNames.shift();
      if (!className) {
        continue;
      }
      parsedClassName = className.split(" ").reduce((result, className) => {
        className = className.trim();
        if (!className) {
          return result;
        }

        if (className in classNameToPropertyMapping) {
          result[classNameToPropertyMapping[className]] = [className];
        } else {
          result._.push(className);
        }

        return result;
      }, parsedClassName);
    }
    return clsx(...new Set(Object.values(parsedClassName).flat()));
  };
}
