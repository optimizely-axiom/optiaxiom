import clsx from "clsx";

import { type Sprinkles, sprinkles } from "../sprinkles";

export const boxSprinkles = ({
  className,
  sx = {},
  ...props
}: { className?: string } & BoxSprinkles) => {
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

  return {
    className: clsx(className, sprinkles({ ...sprinkleProps, ...sx })),
    ...restProps,
  };
};

export type BoxSprinkles = {
  [Key in keyof Sprinkles as Key extends `:${string}`
    ? never
    : Key]: Sprinkles[Key];
} & { sx?: Sprinkles };
