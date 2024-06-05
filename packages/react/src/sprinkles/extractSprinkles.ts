import { type Sprinkles, sprinkles } from "./sprinkles.css";

export function extractSprinkles(props: Record<string, unknown>) {
  const sprinkleProps: Sprinkles = {};
  const restProps: Record<string, unknown> = {};

  for (const [name, value] of Object.entries(props)) {
    if (sprinkles.properties.has(name as never)) {
      // @ts-expect-error -- too complex
      sprinkleProps[name] = value;
    } else {
      restProps[name] = value;
    }
  }

  return { restProps, sprinkleProps };
}
