import { type Sprinkles, sprinkles } from "./sprinkles";

export function extractSprinkles<S extends Record<string, unknown>>(props: S) {
  const sprinkleProps = {} as Pick<S, keyof S & keyof Sprinkles>;
  const restProps = {} as Omit<S, keyof Sprinkles>;

  for (const [name, value] of Object.entries(props)) {
    if (sprinkles.properties.has(name as never)) {
      if (value !== null && value !== undefined) {
        // @ts-expect-error -- too complex
        sprinkleProps[name] = value;
      }
    } else {
      // @ts-expect-error -- too complex
      restProps[name] = value;
    }
  }

  return { restProps, sprinkleProps };
}
