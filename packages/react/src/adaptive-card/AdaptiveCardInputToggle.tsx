import type { InputToggleElement } from "./types";

import { Switch } from "../switch";

export type AdaptiveCardInputToggleProps = {
  /**
   * The toggle input element configuration
   */
  element: InputToggleElement;
  /**
   * Callback function when the toggle value changes
   */
  onChange: (id: string, value: unknown) => void;
  /**
   * Current toggle value
   */
  value: boolean;
};

export function AdaptiveCardInputToggle({
  element,
  onChange,
  value,
}: AdaptiveCardInputToggleProps) {
  return (
    <Switch
      checked={value || false}
      id={element.id}
      onCheckedChange={(checked) => onChange(element.id, checked)}
    >
      {element.title}
    </Switch>
  );
}

AdaptiveCardInputToggle.displayName =
  "@optiaxiom/react/AdaptiveCardInputToggle";
