import type { ComponentPropsWithoutRef } from "react";

import { ProteusAction } from "./ProteusAction";
import { ProteusCancelAction } from "./ProteusCancelAction";
import { ProteusField } from "./ProteusField";
import { ProteusGroup } from "./ProteusGroup";
import { ProteusHeading } from "./ProteusHeading";
import { ProteusImage } from "./ProteusImage";
import { ProteusInput } from "./ProteusInput";
import { ProteusLink } from "./ProteusLink";
import { ProteusMap } from "./ProteusMap";
import { ProteusRange } from "./ProteusRange";
import { ProteusSelect } from "./ProteusSelect";
import { ProteusSelectContent } from "./ProteusSelectContent";
import { ProteusSelectTrigger } from "./ProteusSelectTrigger";
import { ProteusSeparator } from "./ProteusSeparator";
import { ProteusShow } from "./ProteusShow";
import { ProteusText } from "./ProteusText";
import { ProteusTextarea } from "./ProteusTextarea";
import { ProteusValue } from "./ProteusValue";
import { safeParseElement } from "./schemas";

export type ProteusElementProps = {
  /**
   * The block children element(s) to render.
   */
  element: unknown;
};

export const ProteusElement = ({
  element: elementProp,
}: ProteusElementProps) => {
  if (!elementProp) {
    return null;
  } else if (
    typeof elementProp === "string" ||
    typeof elementProp === "number"
  ) {
    return elementProp;
  } else if (Array.isArray(elementProp)) {
    return (
      <>
        {elementProp.map((element, index) => (
          <ProteusElement element={element} key={index} />
        ))}
      </>
    );
  }

  const result = safeParseElement(elementProp as Record<string, unknown>);
  if (!result.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        `[optiaxiom][react][ProteusElement] Invalid block element:`,
        result.error,
      );
    }
    return null;
  }

  const element = result.data;
  switch (element.$type) {
    case "Action":
      return <ProteusAction {...omitType(element)} />;
    case "CancelAction":
      return <ProteusCancelAction {...omitType(element)} />;
    case "Field":
      return <ProteusField {...omitType(element)} />;
    case "Group":
      return <ProteusGroup {...omitType(element)} />;
    case "Heading":
      return <ProteusHeading {...omitType(element)} />;
    case "Image":
      return <ProteusImage {...omitType(element)} />;
    case "Input":
      return <ProteusInput {...omitType(element)} />;
    case "Link":
      return <ProteusLink {...omitType(element)} />;
    case "Map":
      return (
        <ProteusMap
          {...(omitType(element) as ComponentPropsWithoutRef<
            typeof ProteusMap
          >)}
        />
      );
    case "Range":
      return <ProteusRange {...omitType(element)} />;
    case "Select":
      return <ProteusSelect {...omitType(element)} />;
    case "SelectContent":
      return <ProteusSelectContent {...omitType(element)} />;
    case "SelectTrigger":
      return <ProteusSelectTrigger {...omitType(element)} />;
    case "Separator":
      return <ProteusSeparator {...omitType(element)} />;
    case "Show":
      return (
        <ProteusShow
          {...(omitType(element) as ComponentPropsWithoutRef<
            typeof ProteusShow
          >)}
        />
      );
    case "Text":
      return <ProteusText {...omitType(element)} />;
    case "Textarea":
      return <ProteusTextarea {...omitType(element)} />;
    case "Value":
      return (
        <ProteusValue
          {...(omitType(element) as ComponentPropsWithoutRef<
            typeof ProteusValue
          >)}
        />
      );
    default:
      element satisfies never;
      return null;
  }
};

ProteusElement.displayName = "@optiaxiom/react/ProteusElement";

const omitType = <T extends { $type: string }>(obj: T) => {
  const { $type: _$type, ...rest } = obj;
  return rest;
};
