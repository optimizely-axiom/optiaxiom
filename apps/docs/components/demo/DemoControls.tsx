import type { ComponentPropsWithRef, Dispatch, SetStateAction } from "react";
import type { PropItem, Props } from "react-docgen-typescript";

import { Field, Flex, Input, Switch, Text, Tooltip } from "@optiaxiom/react";
import {
  Select,
  SelectContent,
  SelectRadioItem,
  SelectTrigger,
  SelectValue,
} from "@optiaxiom/react/unstable";

type DemoControlProps = ComponentPropsWithRef<typeof Flex> & {
  onChange: Dispatch<
    SetStateAction<Record<keyof Props, boolean | number | string | undefined>>
  >;
  propTypes: Props;
  propValues: Record<keyof Props, boolean | number | string>;
};

export function DemoControls({
  onChange,
  propTypes,
  propValues,
  ...props
}: DemoControlProps) {
  return (
    <Flex justifyContent="start" p="16" pb="32" pt="24" {...props}>
      {Object.values(propTypes)
        .map(itemToControl)
        .filter((a) => !!a)
        .sort((a, b) => a.prop.localeCompare(b.prop))
        .map((item) =>
          item?.type === "boolean" ? (
            <Switch
              checked={String(propValues[item.prop]) === "true"}
              key={String(item.prop)}
              onCheckedChange={(flag) =>
                onChange((props) => ({
                  ...props,
                  [item.prop]: flag,
                }))
              }
            >
              {propToLabel(item.prop)}
            </Switch>
          ) : (
            <Field key={String(item.prop)} label={propToLabel(item.prop)}>
              {item?.type === "dropdown" ? (
                <Select
                  items={item.options}
                  onValueChange={(value) =>
                    onChange((props) => ({
                      ...props,
                      [item.prop]:
                        value === null || value === ""
                          ? undefined
                          : value === "false"
                            ? false
                            : value === "true"
                              ? true
                              : value,
                    }))
                  }
                  value={
                    propValues[item.prop] ? String(propValues[item.prop]) : ""
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    {item.options.map((item) => {
                      return (
                        <SelectRadioItem item={item} key={item}>
                          {item === "" ? (
                            <Text color="fg.secondary">{"<no value>"}</Text>
                          ) : (
                            item
                          )}
                        </SelectRadioItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              ) : item?.type === "range" ? (
                <Tooltip
                  content={propValues[item.prop]}
                  delayDuration={0}
                  onPointerDownOutside={(event) => {
                    event.preventDefault();
                  }}
                >
                  <input
                    max={item.options.length - 1}
                    min={0}
                    onChange={(event) =>
                      onChange((props) => ({
                        ...props,
                        [item.prop]:
                          item.options[parseInt(event?.target.value)],
                      }))
                    }
                    step={1}
                    type="range"
                    value={String(
                      item.options.indexOf(String(propValues[item.prop])),
                    )}
                  />
                </Tooltip>
              ) : item?.type === "text" ? (
                <Input
                  onChange={(event) =>
                    onChange((props) => ({
                      ...props,
                      [item.prop]: event.target.value,
                    }))
                  }
                  value={
                    propValues[item.prop] ? String(propValues[item.prop]) : ""
                  }
                />
              ) : null}
            </Field>
          ),
        )}
    </Flex>
  );
}

const boolean = ["false", "true"];
const tshirt = [
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
];

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

    let maybeNumber;
    try {
      maybeNumber = JSON.parse(value.value);
      if (isNaN(maybeNumber) || isNaN(parseFloat(maybeNumber))) {
        return false;
      }
    } catch {
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
    options: Object.keys(map),
    prop: item.name,
    type: "range" as const,
  };
}

function isTextType(item: PropItem) {
  if (!(item.type.name === "any" || item.type.name === "string")) {
    return false;
  }

  return {
    defaultValue: item.defaultValue?.value ?? "",
    prop: item.name,
    type: "text" as const,
  };
}

function itemToControl(item: PropItem) {
  const number = isNumberType(item);
  if (number) {
    return number;
  }
  const dropdown = isDropdownType(item);
  if (dropdown) {
    if (dropdown.options.every((option) => boolean.includes(String(option)))) {
      return {
        ...dropdown,
        type: "boolean" as const,
      };
    } else if (dropdown.options.every((option) => tshirt.includes(option))) {
      return {
        ...dropdown,
        options: dropdown.options.sort(
          (a, b) => tshirt.indexOf(a) - tshirt.indexOf(b),
        ),
        type: "range" as const,
      };
    }
    return dropdown;
  }
  const text = isTextType(item);
  if (text) {
    return text;
  }
  return;
}

function propToLabel(str: unknown) {
  const result = String(str)
    .replaceAll(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
}
