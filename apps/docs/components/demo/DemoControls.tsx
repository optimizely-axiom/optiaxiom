import type { Dispatch, SetStateAction } from "react";

import { Flex, Text, Tooltip } from "@optiaxiom/react";

type DemoControlProps<Props> = {
  controls: Array<{
    defaultValue: number;
    max: number;
    min: number;
    prop: keyof Props;
    type: "number";
  }>;
  onChange: Dispatch<SetStateAction<Props>>;
  props: Record<keyof Props, number | string>;
};

export function DemoControls<Props>({
  controls,
  onChange,
  props,
}: DemoControlProps<Props>) {
  return (
    <Flex
      justifyContent="start"
      p="md"
      pb="xl"
      pt="lg"
      style={{ borderLeftWidth: "1px" }}
      w="256"
    >
      {controls.map(
        (control) =>
          control.type === "number" && (
            <Flex gap="xs" key={String(control.prop)}>
              <Text fontWeight="600">{propToLabel(control.prop)}</Text>
              <Tooltip
                content={props[control.prop]}
                delayDuration={0}
                onPointerDownOutside={(event) => {
                  event.preventDefault();
                }}
              >
                <input
                  max={control.max}
                  min={control.min}
                  onChange={(event) =>
                    onChange((props) => ({
                      ...props,
                      [control.prop]: event?.target.value,
                    }))
                  }
                  type="range"
                  value={props[control.prop]}
                />
              </Tooltip>
            </Flex>
          ),
      )}
    </Flex>
  );
}

function propToLabel(str: unknown) {
  const result = String(str)
    .replaceAll(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
}
