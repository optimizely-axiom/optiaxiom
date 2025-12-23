import type { TextBlockElement } from "./types";

import { Text } from "../text";

export type AdaptiveCardTextBlockProps = {
  /**
   * The text block element configuration
   */
  element: TextBlockElement;
};

export function AdaptiveCardTextBlock({ element }: AdaptiveCardTextBlockProps) {
  const sizeMap = {
    default: "md",
    extraLarge: "xl",
    large: "lg",
    medium: "md",
    small: "sm",
  } as const;

  const colorMap = {
    accent: "fg.accent",
    attention: "fg.error",
    dark: "fg.default",
    default: "fg.default",
    good: "fg.success",
    light: "fg.tertiary",
    warning: "fg.warning",
  } as const;

  const weightMap = {
    bolder: "600",
    default: "400",
    lighter: "400",
  } as const;

  const color = colorMap[element.color || "default"];
  const fontSize = sizeMap[element.size || "default"];
  const fontWeight = weightMap[element.weight || "default"];

  return (
    <Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
      {element.text}
    </Text>
  );
}

AdaptiveCardTextBlock.displayName = "@optiaxiom/react/AdaptiveCardTextBlock";
