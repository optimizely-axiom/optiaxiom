import { ProteusAction } from "./ProteusAction";
import { ProteusCancelAction } from "./ProteusCancelAction";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { ProteusField } from "./ProteusField";
import { ProteusGroup } from "./ProteusGroup";
import { ProteusHeading } from "./ProteusHeading";
import { ProteusImage } from "./ProteusImage";
import { ProteusInput } from "./ProteusInput";
import { ProteusLink } from "./ProteusLink";
import { ProteusRange } from "./ProteusRange";
import { ProteusSelect } from "./ProteusSelect";
import { ProteusSelectContent } from "./ProteusSelectContent";
import { ProteusSelectTrigger } from "./ProteusSelectTrigger";
import { ProteusSeparator } from "./ProteusSeparator";
import { ProteusText } from "./ProteusText";
import { ProteusTextarea } from "./ProteusTextarea";
import { ProteusElementSchema } from "./schemas";

export type ProteusElementProps = {
  /**
   * The block children element(s) to render.
   */
  element: unknown;
};

export const ProteusElement = ({
  element: elementProp,
}: ProteusElementProps) => {
  const { visibility } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusElement",
  );

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

  const result = ProteusElementSchema.safeParse(elementProp);
  if (!result.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        `[optiaxiom][react][ProteusElement] Invalid block element:`,
        result.error,
      );
    }
    return null;
  }

  const { $id, $visible, ...element } = result.data;
  if (!($id && $id in visibility ? visibility[$id] : $visible !== false)) {
    return null;
  }
  switch (element.$type) {
    case "Proteus.Action":
      return <ProteusAction {...omitType(element)} />;
    case "Proteus.CancelAction":
      return <ProteusCancelAction {...omitType(element)} />;
    case "Proteus.Field":
      return <ProteusField {...omitType(element)} />;
    case "Proteus.Group":
      return <ProteusGroup {...omitType(element)} />;
    case "Proteus.Heading":
      return <ProteusHeading {...omitType(element)} />;
    case "Proteus.Image":
      return <ProteusImage {...omitType(element)} />;
    case "Proteus.Input":
      return <ProteusInput {...omitType(element)} />;
    case "Proteus.Link":
      return <ProteusLink {...omitType(element)} />;
    case "Proteus.Range":
      return <ProteusRange {...omitType(element)} />;
    case "Proteus.Select":
      return <ProteusSelect {...omitType(element)} />;
    case "Proteus.SelectContent":
      return <ProteusSelectContent {...omitType(element)} />;
    case "Proteus.SelectTrigger":
      return <ProteusSelectTrigger {...omitType(element)} />;
    case "Proteus.Separator":
      return <ProteusSeparator {...omitType(element)} />;
    case "Proteus.Text":
      return <ProteusText {...omitType(element)} />;
    case "Proteus.Textarea":
      return <ProteusTextarea {...omitType(element)} />;
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
