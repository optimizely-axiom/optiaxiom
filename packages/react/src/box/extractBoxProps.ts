import { type Sprinkles, sprinkles } from "../sprinkles";

export function extractBoxProps<S extends Record<string, unknown>>(props: S) {
  const boxProps = {} as Pick<S, ("className" | keyof Sprinkles) & keyof S>;
  const restProps = {} as Omit<S, "className" | keyof Sprinkles>;

  for (const [name, value] of Object.entries(props)) {
    if (sprinkles.properties.has(name as never)) {
      if (value !== null && value !== undefined) {
        // @ts-expect-error -- too complex
        boxProps[name] = value;
      }
    } else {
      // @ts-expect-error -- too complex
      restProps[name] = value;
    }
  }

  return { boxProps, restProps };
}
