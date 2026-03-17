import {
  Avatar,
  Badge,
  Box,
  Card,
  CardHeader,
  CardLink,
  Field,
  Group,
  Heading,
  Link,
  SelectContent,
  SelectTrigger,
  Separator,
  Text,
} from "@optiaxiom/react";
import { Range, Time } from "@optiaxiom/react/unstable";
import { type ComponentPropsWithoutRef, lazy, Suspense } from "react";

import { IconCalendar } from "../icons/IconCalendar";
import { ProteusAction } from "../proteus-action/ProteusAction";
import { ProteusCancelAction } from "../proteus-action/ProteusCancelAction";
import { ProteusDataTable } from "../proteus-data-table/ProteusDataTable";
import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { resolveProteusProp } from "../proteus-document/resolveProteusProp";
import { safeParseElement } from "../proteus-document/schemas";
import { ProteusImage } from "../proteus-image/ProteusImage";
import { ProteusInput } from "../proteus-input/ProteusInput";
import { ProteusMap } from "../proteus-map/ProteusMap";
import { ProteusQuestion } from "../proteus-question/ProteusQuestion";
import { ProteusSelect } from "../proteus-select/ProteusSelect";
import { ProteusShow } from "../proteus-show/ProteusShow";
import { ProteusTextarea } from "../proteus-textarea/ProteusTextarea";
import { ProteusValue } from "../proteus-value/ProteusValue";

const ProteusChart = lazy(async () => {
  return {
    default: (await import("../proteus-chart/ProteusChart")).ProteusChart,
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
  const { data, strict } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusElement",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusElement",
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
    if (strict) {
      throw new Error(`Invalid element: ${result.error.join("\n")}`);
    }
    return null;
  }

  const element = result.data;
  const resolve = <T extends { $type: string }>(obj: T) => {
    const { $type: _$type, ...rest } = obj;
    const resolved: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(rest)) {
      resolved[key] = resolveProteusProp(value, data, parentPath);
    }
    return resolved as Omit<T, "$type">;
  };

  switch (element.$type) {
    case "Action":
      return <ProteusAction {...resolve(element)} />;
    case "Avatar":
      return <Avatar {...resolve(element)} />;
    case "Badge":
      return <Badge {...resolve(element)} />;
    case "CancelAction":
      return <ProteusCancelAction {...resolve(element)} />;
    case "Card":
      return <Card {...resolve(element)} />;
    case "CardHeader":
      return <CardHeader {...resolve(element)} />;
    case "CardLink":
      return <CardLink {...resolve(element)} />;
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
      return <Field {...resolve(element)} />;
    case "Group":
      return <Group {...resolve(element)} />;
    case "Heading":
      return <Heading {...resolve(element)} />;
    case "IconCalendar":
      return (
        <Box asChild {...resolve(element)}>
          <IconCalendar />
        </Box>
      );
    case "Image":
      return <ProteusImage {...resolve(element)} />;
    case "Input":
      return <ProteusInput {...resolve(element)} />;
    case "Link":
      return <Link {...resolve(element)} />;
    case "Map":
      return (
        <ProteusMap
          {...(resolve(element) as ComponentPropsWithoutRef<typeof ProteusMap>)}
        />
      );
    case "Question":
      return <ProteusQuestion {...resolve(element)} />;
    case "Range":
      return <Range {...resolve(element)} />;
    case "Select":
      return <ProteusSelect {...resolve(element)} />;
    case "SelectContent":
      return <SelectContent {...resolve(element)} />;
    case "SelectTrigger":
      return <SelectTrigger {...resolve(element)} />;
    case "Separator":
      return <Separator {...resolve(element)} />;
    case "Show":
      return (
        <ProteusShow
          {...(resolve(element) as ComponentPropsWithoutRef<
            typeof ProteusShow
          >)}
        />
      );
    case "Text":
      return <Text {...resolve(element)} />;
    case "Textarea":
      return <ProteusTextarea {...resolve(element)} />;
    case "Time":
      return (
        <Time
          {...(resolve(element) as ComponentPropsWithoutRef<typeof Time>)}
        />
      );
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

ProteusElement.displayName = "@optiaxiom/proteus/ProteusElement";
