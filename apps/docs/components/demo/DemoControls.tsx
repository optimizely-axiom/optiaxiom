import type { ComponentPropsWithRef, Dispatch, SetStateAction } from "react";
import type { PropItem, Props } from "react-docgen-typescript";

import { Flex, Text, Tooltip } from "@optiaxiom/react";

type DemoControlProps = {
  onChange: Dispatch<
    SetStateAction<Record<keyof Props, number | string | undefined>>
  >;
  propTypes: Props;
  propValues: Record<keyof Props, number | string>;
} & ComponentPropsWithRef<typeof Flex>;

export function DemoControls({
  onChange,
  propTypes,
  propValues,
  ...props
}: DemoControlProps) {
  return (
    <Flex justifyContent="start" p="md" pb="xl" pt="lg" {...props}>
      {Object.values(propTypes)
        .map(itemToControl)
        .filter((a) => !!a)
        .sort((a, b) => a.prop.localeCompare(b.prop))
        .map((item) =>
          item?.type === "dropdown" ? (
            <Flex gap="xs" key={String(item.prop)}>
              <Text fontWeight="600">{propToLabel(item.prop)}</Text>
              <select
                onChange={(event) =>
                  onChange((props) => ({
                    ...props,
                    [item.prop]:
                      event?.target.value === ""
                        ? undefined
                        : event?.target.value,
                  }))
                }
                value={propValues[item.prop]}
              >
                {item.options.map((option) => (
                  <option key={option} value={option}>
                    {option || "<Empty>"}
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
                  step={item.step}
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

  const options = item.defaultValue ? [] : [""];
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

    const number = parseFloat(maybeNumber);
    if (min === null || number < min) {
      min = number;
    }
    if (max === null || number > max) {
      max = number;
    }
    list.push(number);
    map[number] = true;
  }
  if (min === null || max === null) {
    return false;
  }

  const step = (max - min) / (list.length - 1);
  for (let i = min; i <= max; i += step) {
    if (!map[i]) {
      return false;
    }
  }

  return {
    defaultValue: item.defaultValue?.value,
    max,
    min,
    prop: item.name,
    step,
    type: "number" as const,
  };
}

function propToLabel(str: unknown) {
  const result = String(str)
    .replaceAll(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
}
