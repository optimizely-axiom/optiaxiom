import { useState } from "react";

import type { AdaptiveCardElement, AdaptiveCardProps } from "./types";

import { Alert } from "../alert";
import { Card } from "../card";
import { AdaptiveCardFactSet } from "./AdaptiveCardFactSet";
import { AdaptiveCardImage } from "./AdaptiveCardImage";
import { AdaptiveCardInputCheckbox } from "./AdaptiveCardInputCheckbox";
import { AdaptiveCardInputDate } from "./AdaptiveCardInputDate";
import { AdaptiveCardInputNumber } from "./AdaptiveCardInputNumber";
import { AdaptiveCardInputRadioGroup } from "./AdaptiveCardInputRadioGroup";
import { AdaptiveCardInputText } from "./AdaptiveCardInputText";
import { AdaptiveCardInputToggle } from "./AdaptiveCardInputToggle";
import { AdaptiveCardTextBlock } from "./AdaptiveCardTextBlock";

export function AdaptiveCard({ card }: AdaptiveCardProps) {
  const [inputValues, setInputValues] = useState<Record<string, unknown>>({});

  const handleInputChange = (id: string, value: unknown) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const ElementRenderer = ({ element }: { element: AdaptiveCardElement }) => {
    switch (element.type) {
      case "Container":
        return (
          <Alert intent={element.style} w="full">
            {element.items?.map((item, index) => (
              <ElementRenderer element={item} key={index} />
            ))}
          </Alert>
        );

      case "FactSet":
        return <AdaptiveCardFactSet element={element} />;

      case "Image":
        return <AdaptiveCardImage element={element} />;

      case "Input.Checkbox":
        return (
          <AdaptiveCardInputCheckbox
            element={element}
            onChange={handleInputChange}
            value={(inputValues[element.id] as string[]) || []}
          />
        );

      case "Input.Date":
        return (
          <AdaptiveCardInputDate
            element={element}
            onChange={handleInputChange}
            value={(inputValues[element.id] as string) || ""}
          />
        );

      case "Input.Number":
        return (
          <AdaptiveCardInputNumber
            element={element}
            onChange={handleInputChange}
            value={(inputValues[element.id] as number) || 0}
          />
        );

      case "Input.RadioGroup":
        return (
          <AdaptiveCardInputRadioGroup
            element={element}
            onChange={handleInputChange}
            value={(inputValues[element.id] as string) || ""}
          />
        );

      case "Input.Text":
        return (
          <AdaptiveCardInputText
            element={element}
            onChange={handleInputChange}
            value={(inputValues[element.id] as string) || ""}
          />
        );

      case "Input.Toggle":
        return (
          <AdaptiveCardInputToggle
            element={element}
            onChange={handleInputChange}
            value={(inputValues[element.id] as boolean) || false}
          />
        );

      case "TextBlock":
        return <AdaptiveCardTextBlock element={element} />;

      default:
        return null;
    }
  };

  return (
    <Card>
      {card.body?.map((element, index) => (
        <ElementRenderer element={element} key={index} />
      ))}
    </Card>
  );
}

AdaptiveCard.displayName = "@optiaxiom/react/AdaptiveCard";
