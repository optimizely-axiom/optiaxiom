import { Fragment } from "react";

import type { AdaptiveCardElement, ContainerElement } from "./types";

import { Alert } from "../alert";

export type AdaptiveCardContainerProps = {
  /**
   * The container element configuration
   */
  element: ContainerElement;
  /**
   * Function to render child elements
   */
  renderElement: (element: AdaptiveCardElement) => React.ReactNode;
};

export function AdaptiveCardContainer({
  element,
  renderElement,
}: AdaptiveCardContainerProps) {
  return (
    <Alert intent={element.style} w="full">
      {element.items?.map((item, index) => (
        <Fragment key={index}>{renderElement(item)}</Fragment>
      ))}
    </Alert>
  );
}

AdaptiveCardContainer.displayName = "@optiaxiom/react/AdaptiveCardContainer";
