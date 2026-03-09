import { type ComponentPropsWithoutRef, lazy, Suspense } from "react";

import { ProteusAction } from "./ProteusAction";
import { ProteusBadge } from "./ProteusBadge";
import { ProteusCancelAction } from "./ProteusCancelAction";
import { ProteusDataTable } from "./ProteusDataTable";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";
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
import { ProteusTime } from "./ProteusTime";
import { ProteusValue } from "./ProteusValue";
import { resolveProteusValue } from "./resolveProteusValue";
import { safeParseElement } from "./schemas";

const ProteusChart = lazy(async () => {
  return {
    default: (await import("./ProteusChart")).ProteusChart,
  };
});

export type ProteusElementProps = {
  /**
   * The block children element(s) to render.
   */
  element: unknown;
};

export const ProteusElement = ({
  element: elementProp,
}: ProteusElementProps) => {
  const { data } = useProteusDocumentContext("@optiaxiom/react/ProteusElement");
  const { path: parentPath } = useProteusDocumentPathContext(
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
  const resolve = (obj: Record<string, unknown>) => {
    const { $type: _$type, children, ...rest } = obj;
    const resolved: Record<string, unknown> = { children };
    for (const [key, value] of Object.entries(rest)) {
      resolved[key] = resolveProteusValue(value, data, parentPath);
    }
    return resolved;
  };

  switch (element.$type) {
    case "Action":
      return <ProteusAction {...resolve(element)} />;
    case "Badge":
      return <ProteusBadge {...resolve(element)} />;
    case "CancelAction":
      return <ProteusCancelAction {...resolve(element)} />;
    case "Chart":
      return (
        <Suspense fallback={null}>
          <ProteusChart
            {...(resolve(element) as ComponentPropsWithoutRef<
              typeof ProteusChart
            >)}
          />
        </Suspense>
      );
    case "DataTable":
      return (
        <ProteusDataTable
          {...(resolve(element) as ComponentPropsWithoutRef<
            typeof ProteusDataTable
          >)}
        />
      );
    case "Field":
      return <ProteusField {...resolve(element)} />;
    case "Group":
      return <ProteusGroup {...resolve(element)} />;
    case "Heading":
      return <ProteusHeading {...resolve(element)} />;
    case "Image":
      return <ProteusImage {...resolve(element)} />;
    case "Input":
      return <ProteusInput {...resolve(element)} />;
    case "Link":
      return <ProteusLink {...resolve(element)} />;
    case "Map":
      return (
        <ProteusMap
          {...(resolve(element) as ComponentPropsWithoutRef<typeof ProteusMap>)}
        />
      );
    case "Range":
      return <ProteusRange {...resolve(element)} />;
    case "Select":
      return <ProteusSelect {...resolve(element)} />;
    case "SelectContent":
      return <ProteusSelectContent {...resolve(element)} />;
    case "SelectTrigger":
      return <ProteusSelectTrigger {...resolve(element)} />;
    case "Separator":
      return <ProteusSeparator {...resolve(element)} />;
    case "Show":
      return (
        <ProteusShow
          {...(resolve(element) as ComponentPropsWithoutRef<
            typeof ProteusShow
          >)}
        />
      );
    case "Text":
      return <ProteusText {...resolve(element)} />;
    case "Textarea":
      return <ProteusTextarea {...resolve(element)} />;
    case "Time":
      return <ProteusTime {...resolve(element)} />;
    case "Value":
      return (
        <ProteusValue
          {...(element as unknown as ComponentPropsWithoutRef<
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
