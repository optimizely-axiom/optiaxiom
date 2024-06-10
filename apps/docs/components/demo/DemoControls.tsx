import type { Dispatch, SetStateAction } from "react";
import type { PropItem, Props } from "react-docgen-typescript";

import { Flex, Text, Tooltip } from "@optiaxiom/react";

type DemoControlProps = {
  onChange: Dispatch<SetStateAction<Record<keyof Props, number | string>>>;
  propTypes: Props;
  propValues: Record<keyof Props, number | string>;
};

export function DemoControls({
  onChange,
  propTypes,
  propValues,
}: DemoControlProps) {
  return (
    <Flex
      justifyContent="start"
      p="md"
      pb="xl"
      pt="lg"
      style={{ borderLeftWidth: "1px" }}
      w="256"
    >
      {Object.values(propTypes)
        .map(itemToControl)
        .map((item) =>
          item?.type === "dropdown" ? (
            <Flex gap="xs" key={String(item.prop)}>
              <Text fontWeight="600">{propToLabel(item.prop)}</Text>
              <select
                onChange={(event) =>
                  onChange((props) => ({
                    ...props,
                    [item.prop]: event?.target.value,
                  }))
                }
              >
                {item.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Flex>
          ) : item?.type === "number" ? (
            <Flex gap="xs" key={String(item.prop)}>
              <Text fontWeight="600">{propToLabel(item.prop)}</Text>
              <Tooltip
                content={propValues[item.prop]}
                delayDuration={0}
                onPointerDownOutside={(event) => {
                  event.preventDefault();
                }}
              >
                <input
                  max={item.max}
                  min={item.min}
                  onChange={(event) =>
                    onChange((props) => ({
                      ...props,
                      [item.prop]: event?.target.value,
                    }))
                  }
                  type="range"
                  value={propValues[item.prop]}
                />
              </Tooltip>
            </Flex>
          ) : null,
        )}
    </Flex>
  );
}

function itemToControl(item: PropItem) {
  const number = isNumberType(item);
  if (number) {
    return number;
  }
  const dropdown = isDropdownType(item);
  if (dropdown) {
    return dropdown;
  }
  return;
}

function isDropdownType(item: PropItem) {
  const type = item.type;
  if (type.name !== "enum" || !Array.isArray(type.value)) {
    return false;
  }

  const options = [];
  for (const value of type.value) {
    if (!(value && typeof value === "object" && "value" in value)) {
      return false;
    }

    if ("description" in value) {
      continue;
    }

    options.push(JSON.parse(value.value));
  }

  return {
    defaultValue: item.defaultValue?.value,
    options,
    prop: item.name,
    type: "dropdown" as const,
  };
}

function isNumberType(item: PropItem) {
  const type = item.type;
  if (type.name !== "enum" || !Array.isArray(type.value)) {
    return false;
  }

  const list: number[] = [];
  const map: Record<number, true> = {};
  let min = null;
  let max = null;

  for (const value of type.value) {
    if (!(value && typeof value === "object" && "value" in value)) {
      return false;
    }

    const maybeNumber = JSON.parse(value.value);
    if (isNaN(maybeNumber) || isNaN(parseFloat(maybeNumber))) {
      return false;
    }

    if (min === null || maybeNumber < min) {
      min = maybeNumber;
    }
    if (max === null || maybeNumber > max) {
      max = maybeNumber;
    }
    list.push(maybeNumber);
    map[maybeNumber] = true;
  }

  for (let i = min; i <= max; i++) {
    if (!map[i]) {
      return false;
    }
  }

  return {
    defaultValue: item.defaultValue?.value,
    max,
    min,
    prop: item.name,
    type: "number" as const,
  };
}

function propToLabel(str: unknown) {
  const result = String(str)
    .replaceAll(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
}
