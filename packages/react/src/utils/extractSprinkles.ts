import clsx from "clsx";

export const extractSprinkles = <Sprinkles>(
  sprinkles: ((props: Sprinkles) => string) & {
    properties: Set<keyof Sprinkles>;
  },
  { className, ...props }: { className?: string } & Sprinkles,
) => {
  const sprinkleProps = {} as Sprinkles;
  const restProps: Record<string, unknown> = {};

  for (const [prop, value] of Object.entries<Sprinkles[keyof Sprinkles]>(
    props,
  )) {
    if (sprinkles.properties.has(prop as keyof Sprinkles)) {
      sprinkleProps[prop as keyof Sprinkles] = value;
    } else {
      restProps[prop] = value;
    }
  }

  return {
    className: clsx(className, sprinkles(sprinkleProps)),
    ...restProps,
  };
};
