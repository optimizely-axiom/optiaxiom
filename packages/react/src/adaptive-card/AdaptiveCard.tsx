import { Fragment, useState } from "react";

import type {
  AdaptiveCardActionData,
  AdaptiveCardElement,
  AdaptiveCardProps,
  ImageElement,
} from "./types";

import { Card, CardFooter, CardHeader } from "../card";
import { Group } from "../group";
import { AdaptiveCardAction } from "./AdaptiveCardAction";
import { AdaptiveCardContainer } from "./AdaptiveCardContainer";
import { AdaptiveCardFactSet } from "./AdaptiveCardFactSet";
import { AdaptiveCardImage } from "./AdaptiveCardImage";
import { AdaptiveCardInputCheckbox } from "./AdaptiveCardInputCheckbox";
import { AdaptiveCardInputDate } from "./AdaptiveCardInputDate";
import { AdaptiveCardInputNumber } from "./AdaptiveCardInputNumber";
import { AdaptiveCardInputRadioGroup } from "./AdaptiveCardInputRadioGroup";
import { AdaptiveCardInputText } from "./AdaptiveCardInputText";
import { AdaptiveCardInputToggle } from "./AdaptiveCardInputToggle";
import { AdaptiveCardTextBlock } from "./AdaptiveCardTextBlock";

export function AdaptiveCard({ card, onAction }: AdaptiveCardProps) {
  const [inputValues, setInputValues] = useState<Record<string, unknown>>({});

  const handleInputChange = (id: string, value: unknown) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleAction = (action: AdaptiveCardActionData) => {
    if (action.type === "Action.Submit") {
      onAction?.(action.type, { ...action.data, ...inputValues });
    } else if (action.type === "Action.OpenUrl") {
      onAction?.(action.type, { url: action.url });
    } else if (action.type === "Action.Execute") {
      onAction?.(action.type, { data: action.data, verb: action.verb });
    }
  };

  const renderElement = (element: AdaptiveCardElement): React.ReactNode => {
    switch (element.type) {
      case "Container":
        return (
          <AdaptiveCardContainer
            element={element}
            renderElement={renderElement}
          />
        );

      case "FactSet":
        return <AdaptiveCardFactSet element={element} />;

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

  const images =
    (card.body?.filter((el) => el.type === "Image") as ImageElement[]) || [];
  const nonImageElements = card.body?.filter((el) => el.type !== "Image") || [];

  return (
    <Card>
      {images.map((image, index) => (
        <AdaptiveCardImage element={image} key={`image-${index}`} />
      ))}

      {card.header && (
        <CardHeader description={card.header.description}>
          {card.header.title}
        </CardHeader>
      )}

      {nonImageElements.map((element, index) => (
        <Fragment key={index}>{renderElement(element)}</Fragment>
      ))}

      {card.actions && card.actions.length > 0 && (
        <CardFooter>
          <Group gap="8">
            {card.actions.map((action, index) => (
              <AdaptiveCardAction
                action={action}
                key={index}
                onClick={handleAction}
              />
            ))}
          </Group>
        </CardFooter>
      )}
    </Card>
  );
}

AdaptiveCard.displayName = "@optiaxiom/react/AdaptiveCard";
