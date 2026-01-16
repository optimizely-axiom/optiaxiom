import type { ImageElement } from "./types";

import { CardImage, CardPreview } from "../card";

export type AdaptiveCardImageProps = {
  /**
   * The image element configuration
   */
  element: ImageElement;
};

export function AdaptiveCardImage({ element }: AdaptiveCardImageProps) {
  return (
    <CardPreview>
      <CardImage alt={element.altText || ""} src={element.url} />
    </CardPreview>
  );
}

AdaptiveCardImage.displayName = "@optiaxiom/react/AdaptiveCardImage";
