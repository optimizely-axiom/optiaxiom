import type { ReactNode } from "react";

import {
  Box,
  Button,
  Cover,
  Group,
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
  Text,
} from "@optiaxiom/react";
import {
  IconAdjustmentsHorizontal,
  IconAlertTriangle,
  IconArrowsShuffle,
  IconClick,
  IconColumnInsertRight,
  IconForms,
  IconHeading,
  IconInputSearch,
  IconLayoutList,
  IconLetterT,
  IconLink,
  IconMinus,
  IconNotes,
  IconPhoto,
  IconPlus,
  IconTrash,
  IconVariable,
} from "@tabler/icons-react";

import { elementMap, getExample } from "../schemaUtils";

export function TreeRow({
  depth,
  icon,
  isSelected,
  label,
  menuOptions,
  onClick,
  onIconClick,
  onKeyDown,
  onRemove,
  subtitle,
  textStyle,
  type,
}: {
  depth: number;
  icon?: ReactNode;
  isSelected: boolean;
  label: string;
  menuOptions?: MenuOption[];
  onClick: () => void;
  onIconClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onRemove?: () => void;
  subtitle?: string;
  textStyle: "italic" | "normal";
  type: string;
}) {
  return (
    <Group
      bg={isSelected ? "bg.accent.subtle" : undefined}
      cursor="pointer"
      fontSize="sm"
      gap="4"
      onKeyDown={onKeyDown}
      px="4"
      py="2"
      rounded="sm"
      style={{ paddingLeft: `${depth * 16 + 4}px` }}
    >
      <style>{`
        @scope {
          :scope {
            position: relative;

            & [data-add-btn]:not(:has([data-state="open"])) {
              opacity: 0;
            }

            &:hover {
              background: var(--ax-colors-bg-secondary);

              & [data-add-btn] {
                opacity: 1;
              }
            }
          }
        }
      `}</style>
      {icon ? (
        <Box
          cursor="pointer"
          display="flex"
          onClick={onIconClick}
          style={{ flexShrink: 0, position: "relative" }}
          z="10"
        >
          {icon}
        </Box>
      ) : (
        <Box style={{ flexShrink: 0, width: 14 }} />
      )}
      {ELEMENT_ICONS[type]}
      <Cover asChild>
        <Text
          fontSize="sm"
          fontWeight={isSelected ? "600" : "400"}
          onClick={onClick}
          style={{ fontStyle: textStyle, minWidth: 0 }}
          tabIndex={0}
          whiteSpace="nowrap"
        >
          {label}
        </Text>
      </Cover>
      {subtitle && (
        <Text
          color="fg.tertiary"
          fontSize="sm"
          style={{ flex: "none" }}
          whiteSpace="nowrap"
        >
          {subtitle}
        </Text>
      )}
      {(menuOptions || onRemove) && (
        <Group
          data-add-btn=""
          gap="0"
          style={{ flexShrink: 0, marginLeft: "auto" }}
        >
          {menuOptions && (
            <Menu inputVisible="always" options={menuOptions}>
              <MenuTrigger
                appearance="subtle"
                aria-label="Add element"
                icon={<IconPlus size={14} />}
                size="sm"
              />
              <MenuContent maxH="sm" />
            </Menu>
          )}
          {onRemove ? (
            <Button
              appearance="subtle"
              aria-label="Remove element"
              icon={<IconTrash size={14} />}
              onClick={onRemove}
              size="sm"
            />
          ) : (
            <Box size="sm" />
          )}
        </Group>
      )}
    </Group>
  );
}

export const ELEMENT_ICONS: Record<string, ReactNode> = {
  Action: <IconClick />,
  CancelAction: <IconClick />,
  Field: <IconForms />,
  Group: <IconLayoutList />,
  Heading: <IconHeading />,
  Image: <IconPhoto />,
  Input: <IconInputSearch />,
  Link: <IconLink />,
  Map: <IconArrowsShuffle />,
  Range: <IconAdjustmentsHorizontal />,
  Select: <IconColumnInsertRight />,
  Separator: <IconMinus />,
  Show: <IconAlertTriangle />,
  Text: <IconLetterT />,
  Textarea: <IconNotes />,
  Value: <IconVariable />,
};

const ACTION_TYPES = new Set(["Action", "CancelAction"]);

export function getContainerOptions(
  onInsertInside: (element: object) => void,
  onInsertAfter: (element: object) => void,
): MenuOption[] {
  return [
    {
      label: "Add inside",
      subOptions: getAllElementOptions(onInsertInside),
    },
    {
      label: "Add after",
      subOptions: getAllElementOptions(onInsertAfter),
    },
  ];
}

export function getDocumentOptions(
  onInsertBody: (element: object) => void,
  onInsertAction: (element: object) => void,
): MenuOption[] {
  const bodyOptions = Object.keys(elementMap)
    .map((type) => String(type))
    .filter((type) => !ACTION_TYPES.has(type))
    .map((type) => ({
      addon: ELEMENT_ICONS[type],
      execute: () => {
        const template = getExample(type);
        if (template) {
          onInsertBody(structuredClone(template));
        }
      },
      label: type,
    }));

  const actionOptions = Object.keys(elementMap)
    .map((type) => String(type))
    .filter((type) => ACTION_TYPES.has(type))
    .map((type) => ({
      addon: ELEMENT_ICONS[type],
      execute: () => {
        const template = getExample(type);
        if (template) {
          onInsertAction(structuredClone(template));
        }
      },
      label: type,
    }));

  return [
    {
      label: "Body",
      subOptions: bodyOptions,
    },
    {
      label: "Actions",
      subOptions: actionOptions,
    },
  ];
}

function getAllElementOptions(
  onInsert: (element: object) => void,
): MenuOption[] {
  return Object.keys(elementMap)
    .map((type) => String(type))
    .map((type) => ({
      addon: ELEMENT_ICONS[type],
      execute: () => {
        const template = getExample(type);
        if (template) {
          onInsert(structuredClone(template));
        }
      },
      label: type,
    }));
}
