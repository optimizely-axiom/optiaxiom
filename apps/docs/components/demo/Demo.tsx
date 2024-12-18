import type { Props } from "react-docgen-typescript";

import { Box, Flex, Separator } from "@optiaxiom/react";
import { type ComponentType, type ReactNode, useState } from "react";

import styles from "./Demo.module.css";
import { DemoCode } from "./DemoCode";
import { DemoControls } from "./DemoControls";
import { DemoIframe } from "./DemoIframe";

export function Demo({
  children,
  component: Component,
  height,
  iframe,
  propTypes = {},
}: {
  children: ReactNode;
  component: ComponentType;
  height?: string;
  iframe?: string;
  propTypes: Props;
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
      bg="bg.default"
      border="1"
      borderColor="border.tertiary"
      mt="32"
      rounded="lg"
    >
      <Box
        alignItems="stretch"
        borderB="1"
        borderColor="border.tertiary"
        className={iframe && styles.resize}
        display="flex"
        flexDirection={["column", "row"]}
      >
        <Flex
          flex="1"
          flexDirection="row"
          gap="0"
          justifyContent="center"
          p="32"
        >
          {iframe ? (
            <DemoIframe height={height} src={iframe} />
          ) : (
            <Component {...props} />
          )}
        </Flex>
        {Object.keys(propTypes).length > 0 && (
          <>
            <Separator
              borderColor="border.tertiary"
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
      <DemoCode>{children}</DemoCode>
    </Box>
  );
}
