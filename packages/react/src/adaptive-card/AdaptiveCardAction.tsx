import type { AdaptiveCardActionData } from "./types";

import { Button } from "../button";

export type AdaptiveCardActionProps = {
  /**
   * The action configuration
   */
  action: AdaptiveCardActionData;
  /**
   * Callback function when the action is clicked
   */
  onClick: (action: AdaptiveCardActionData) => void;
};

export function AdaptiveCardAction({
  action,
  onClick,
}: AdaptiveCardActionProps) {
  return <Button onClick={() => onClick(action)}>{action.title}</Button>;
}

AdaptiveCardAction.displayName = "@optiaxiom/react/AdaptiveCardAction";
