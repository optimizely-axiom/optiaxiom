import { BlockAction } from "./BlockAction";
import { BlockCancelAction } from "./BlockCancelAction";
import { useBlockDocumentContext } from "./BlockDocumentContext";
import { BlockField } from "./BlockField";
import { BlockGroup } from "./BlockGroup";
import { BlockHeading } from "./BlockHeading";
import { BlockImage } from "./BlockImage";
import { BlockInput } from "./BlockInput";
import { BlockLink } from "./BlockLink";
import { BlockRange } from "./BlockRange";
import { BlockSelect } from "./BlockSelect";
import { BlockSelectContent } from "./BlockSelectContent";
import { BlockSelectTrigger } from "./BlockSelectTrigger";
import { BlockSeparator } from "./BlockSeparator";
import { BlockText } from "./BlockText";
import { BlockTextarea } from "./BlockTextarea";
import { BlockElementSchema } from "./schemas";

export type BlockElementProps = {
  /**
   * The block children element(s) to render.
   */
  element: unknown;
};

export const BlockElement = ({ element: elementProp }: BlockElementProps) => {
  const { visibility } = useBlockDocumentContext(
    "@optiaxiom/react/BlockElement",
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
          <BlockElement element={element} key={index} />
        ))}
      </>
    );
  }

  const result = BlockElementSchema.safeParse(elementProp);
  if (!result.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        `[optiaxiom][react][BlockElement] Invalid block element:`,
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
    case "Block.Action":
      return <BlockAction {...omitType(element)} />;
    case "Block.CancelAction":
      return <BlockCancelAction {...omitType(element)} />;
    case "Block.Field":
      return <BlockField {...omitType(element)} />;
    case "Block.Group":
      return <BlockGroup {...omitType(element)} />;
    case "Block.Heading":
      return <BlockHeading {...omitType(element)} />;
    case "Block.Image":
      return <BlockImage {...omitType(element)} />;
    case "Block.Input":
      return <BlockInput {...omitType(element)} />;
    case "Block.Link":
      return <BlockLink {...omitType(element)} />;
    case "Block.Range":
      return <BlockRange {...omitType(element)} />;
    case "Block.Select":
      return <BlockSelect {...omitType(element)} />;
    case "Block.SelectContent":
      return <BlockSelectContent {...omitType(element)} />;
    case "Block.SelectTrigger":
      return <BlockSelectTrigger {...omitType(element)} />;
    case "Block.Separator":
      return <BlockSeparator {...omitType(element)} />;
    case "Block.Text":
      return <BlockText {...omitType(element)} />;
    case "Block.Textarea":
      return <BlockTextarea {...omitType(element)} />;
    default:
      element satisfies never;
      return null;
  }
};

BlockElement.displayName = "@optiaxiom/react/BlockElement";

const omitType = <T extends { $type: string }>(obj: T) => {
  const { $type: _$type, ...rest } = obj;
  return rest;
};
