"use client";

import type { Props } from "react-docgen-typescript";

import { Box, Flex, Separator } from "@optiaxiom/react";
import { cloneElement, type ReactElement, useState } from "react";

import { DemoControls } from "./DemoControls";
import { DemoIframe } from "./DemoIframe";
import styles from "./DemoPreview.module.css";

export function DemoPreview({
  component,
  height,
  iframe,
  propTypes = {},
}: {
  component: ReactElement;
  height?: string;
  iframe?: string;
  propTypes: Props | undefined;
}) {
  const [props, setProps] = useState(() =>
    Object.entries(propTypes).reduce(
      (result, [name, item]) =>
        Object.assign(result, {
          [name]:
            item.defaultValue?.value === ""
              ? undefined
              : item.defaultValue?.value === "false"
                ? false
                : item.defaultValue?.value === "true"
                  ? true
                  : item.defaultValue?.value,
        }),
      {},
    ),
  );

  return (
    <Box
      alignItems="stretch"
      borderB="1"
      className={iframe && styles.resize}
      display="flex"
      flexDirection={["column", "row"]}
    >
      <Flex flex="1" flexDirection="row" gap="0" justifyContent="center" p="32">
        {iframe ? (
          <DemoIframe height={height} src={iframe} />
        ) : (
          cloneElement(component, props)
        )}
      </Flex>
      {Object.keys(propTypes).length > 0 && (
        <>
          <Separator
            borderColor="border.default"
            orientation={["horizontal", "vertical"]}
          />
          <DemoControls
            onChange={setProps}
            propTypes={propTypes}
            propValues={props}
            w={["auto", "224"]}
          />
        </>
      )}
    </Box>
  );
}
