import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  CardHeader,
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
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

import { ProteusAction } from "../proteus-action/ProteusAction";
import { ProteusBridge } from "../proteus-bridge/ProteusBridge";
import { ProteusCard } from "../proteus-card/ProteusCard";
import { ProteusCardLink } from "../proteus-card-link/ProteusCardLink";
import { ProteusDataTable } from "../proteus-data-table/ProteusDataTable";
import { ProteusDateInput } from "../proteus-date-input/ProteusDateInput";
import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { resolveProteusProp } from "../proteus-document/resolveProteusProp";
import { safeParseElement } from "../proteus-document/schemas";
import { ProteusFederated } from "../proteus-federated/ProteusFederated";
import { ProteusFileIcon } from "../proteus-file-icon/ProteusFileIcon";
import { ProteusFileUpload } from "../proteus-file-upload/ProteusFileUpload";
import { ProteusImageCarousel } from "../proteus-image-carousel/ProteusImageCarousel";
import { ProteusImage } from "../proteus-image/ProteusImage";
import { ProteusInput } from "../proteus-input/ProteusInput";
import { ProteusLength } from "../proteus-length/ProteusLength";
import { ProteusMapIndex } from "../proteus-map-index/ProteusMapIndex";
import { ProteusMap } from "../proteus-map/ProteusMap";
import { ProteusMarkdown } from "../proteus-markdown/ProteusMarkdown";
import { ProteusPillMenu } from "../proteus-pill-menu/ProteusPillMenu";
import { ProteusQuestion } from "../proteus-question/ProteusQuestion";
import { ProteusRichTextEditor } from "../proteus-rich-text-editor/ProteusRichTextEditor";
import { ProteusSelect } from "../proteus-select/ProteusSelect";
import { ProteusShow } from "../proteus-show/ProteusShow";
import { ProteusSwitch } from "../proteus-switch/ProteusSwitch";
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
  const { data, icons, strict } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusElement",
  );
  const { mapIndices, path: parentPath } = useProteusDocumentPathContext(
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
      resolved[key] = resolveProteusProp(value, data, parentPath, mapIndices);
    }
    return resolved as Omit<T, "$type">;
  };

  switch (element.$type) {
    case "Action":
      return <ProteusAction {...resolve(element)} />;
    case "Alert":
      return <Alert {...resolve(element)} />;
    case "Avatar":
      return <Avatar {...resolve(element)} />;
    case "AvatarGroup":
      return <AvatarGroup {...resolve(element)} />;
    case "Badge":
      return <Badge {...resolve(element)} />;
    case "Bridge":
      return (
        <ProteusBridge
          {...(resolve(element) as ComponentPropsWithoutRef<
            typeof ProteusBridge
          >)}
        />
      );
    case "Button":
      return <ProteusAction {...resolve(element)} />;
    case "Card":
      return <ProteusCard {...resolve(element)} />;
    case "CardHeader":
      return <CardHeader {...resolve(element)} />;
    case "CardLink":
      return <ProteusCardLink {...resolve(element)} />;
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
    case "DateInput":
      return <ProteusDateInput {...resolve(element)} />;
    case "Disclosure":
      return <Disclosure {...resolve(element)} />;
    case "DisclosureContent":
      return <DisclosureContent {...resolve(element)} />;
    case "DisclosureTrigger":
      return <DisclosureTrigger {...resolve(element)} />;
    case "Federated":
      return (
        <ProteusFederated
          {...(resolve(element) as ComponentPropsWithoutRef<
            typeof ProteusFederated
          >)}
        />
      );
    case "Field":
      return <Field {...resolve(element)} />;
    case "FileIcon":
      return <ProteusFileIcon {...resolve(element)} />;
    case "FileUpload":
      return <ProteusFileUpload {...resolve(element)} />;
    case "Group":
      return <Group {...resolve(element)} />;
    case "Heading":
      return <Heading {...resolve(element)} />;
    case "Icon": {
      const { filled, name, ...rest } = resolve(element);
      const IconComp = icons?.[name as string];
      if (!IconComp) {
        if (strict) {
          throw new Error(
            `Icon "${name}" not registered. Pass it via the \`icons\` prop on ProteusDocumentRenderer.`,
          );
        }
        return null;
      }
      return (
        <Box asChild {...rest}>
          <IconComp filled={filled} />
        </Box>
      );
    }
    case "Image":
      return <ProteusImage {...resolve(element)} />;
    case "ImageCarousel":
      return (
        <ProteusImageCarousel
          {...(resolve(element) as ComponentPropsWithoutRef<
            typeof ProteusImageCarousel
          >)}
        />
      );
    case "Input":
      return <ProteusInput {...resolve(element)} />;
    case "Length":
      return <ProteusLength {...resolve(element)} />;
    case "Link":
      return <Link target="_blank" {...resolve(element)} />;
    case "Map":
      return (
        <ProteusMap
          {...(resolve(element) as ComponentPropsWithoutRef<typeof ProteusMap>)}
        />
      );
    case "MapIndex":
      return <ProteusMapIndex {...resolve(element)} />;
    case "Markdown":
      return (
        <ProteusMarkdown
          {...(resolve(element) as ComponentPropsWithoutRef<
            typeof ProteusMarkdown
          >)}
        />
      );
    case "PillMenu":
      return <ProteusPillMenu {...resolve(element)} />;
    case "Question":
      return <ProteusQuestion {...resolve(element)} />;
    case "Range":
      return <Range {...resolve(element)} />;
    case "RichTextEditor":
      return <ProteusRichTextEditor {...resolve(element)} />;
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
    case "Switch":
      return <ProteusSwitch {...resolve(element)} />;
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
