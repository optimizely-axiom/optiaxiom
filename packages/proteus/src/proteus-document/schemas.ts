import type {
  AvatarProps,
  BadgeProps,
  BoxProps,
  CardHeaderProps,
  CardLinkProps,
  CardProps,
  FieldProps,
  GroupProps,
  HeadingProps,
  InputProps,
  LinkProps,
  SelectContentProps,
  SelectTriggerProps,
  SeparatorProps,
  SwitchProps,
  TextareaProps,
  TextProps,
} from "@optiaxiom/react";
import type { RangeProps, TimeProps } from "@optiaxiom/react/unstable";

import { Validator } from "@cfworker/json-schema";

import type { ProteusActionProps } from "../proteus-action/ProteusAction";
import type { ProteusCancelActionProps } from "../proteus-action/ProteusCancelAction";
import type { ProteusChartProps } from "../proteus-chart/ProteusChart";
import type { ProteusDataTableProps } from "../proteus-data-table/ProteusDataTable";
import type { ProteusImageCarouselProps } from "../proteus-image-carousel/ProteusImageCarousel";
import type { ProteusImageProps } from "../proteus-image/ProteusImage";
import type { ProteusMapProps } from "../proteus-map/ProteusMap";
import type { ProteusQuestionProps } from "../proteus-question/ProteusQuestion";
import type { ProteusSelectProps } from "../proteus-select/ProteusSelect";
import type { ProteusShowProps } from "../proteus-show/ProteusShow";
import type { ProteusValueProps } from "../proteus-value/ProteusValue";
import type { ProteusDocumentShellProps } from "./ProteusDocumentShell";

import proteusDocumentSpec from "../schema/runtime-schema.json";

export type ProteusElement =
  | (AvatarProps & { $type: "Avatar" })
  | (BadgeProps & { $type: "Badge" })
  | (BoxProps & { $type: "IconCalendar" })
  | (CardHeaderProps & { $type: "CardHeader" })
  | (CardLinkProps & { $type: "CardLink" })
  | (CardProps & { $type: "Card" })
  | (FieldProps & { $type: "Field" })
  | (GroupProps & { $type: "Group" })
  | (HeadingProps & { $type: "Heading" })
  | (InputProps & { $type: "Input" })
  | (LinkProps & { $type: "Link" })
  | (ProteusActionProps & { $type: "Action" })
  | (ProteusCancelActionProps & { $type: "CancelAction" })
  | (ProteusChartProps & { $type: "Chart" })
  | (ProteusDataTableProps & { $type: "DataTable" })
  | (ProteusImageCarouselProps & { $type: "ImageCarousel" })
  | (ProteusImageProps & { $type: "Image" })
  | (ProteusMapProps & { $type: "Map" })
  | (ProteusQuestionProps & { $type: "Question" })
  | (ProteusSelectProps & { $type: "Select" })
  | (ProteusShowProps & { $type: "Show" })
  | (ProteusValueProps & { $type: "Value" })
  | (RangeProps & { $type: "Range" })
  | (SelectContentProps & { $type: "SelectContent" })
  | (SelectTriggerProps & { $type: "SelectTrigger" })
  | (SeparatorProps & { $type: "Separator" })
  | (SwitchProps & { $type: "Switch" })
  | (TextareaProps & { $type: "Textarea" })
  | (TextProps & { $type: "Text" })
  | (TimeProps & { $type: "Time" });

export type ProteusEventHandler =
  | {
      action: "download";
      url: (ProteusValueProps & { $type: "Value" }) | string | string[];
    }
  | { interaction: string }
  | { message: string };

type ProteusDocument = ProteusDocumentShellProps["element"] & {
  $type: "Document";
};

// --- safeParse ---

const documentValidator = new Validator(
  {
    $ref: "#/definitions/ProteusDocument",
    definitions: proteusDocumentSpec.definitions,
  } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  "7",
);

const elementValidator = new Validator(
  {
    $ref: "#/definitions/ProteusNode",
    definitions: proteusDocumentSpec.definitions,
  } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  "7",
);

type SafeParseResult<T> =
  | { data: T; success: true }
  | { error: string[]; success: false };

export function safeParseDocument({
  actions,
  body,
  ...data
}: Record<string, unknown>): SafeParseResult<ProteusDocument> {
  const result = documentValidator.validate({ body: [], ...data });
  if (result.valid) {
    return {
      data: { actions, body, ...data } as ProteusDocument,
      success: true,
    };
  }
  return { error: result.errors.map(({ error }) => error), success: false };
}

export function safeParseElement({
  children,
  ...data
}: Record<string, unknown>): SafeParseResult<ProteusElement> {
  const result = elementValidator.validate(data);
  if (result.valid) {
    return {
      data: { children, ...data } as unknown as ProteusElement,
      success: true,
    };
  }
  return { error: result.errors.map(({ error }) => error), success: false };
}
