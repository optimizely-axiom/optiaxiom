import type { Props } from "react-docgen-typescript";

import { Box, Flex } from "@optiaxiom/react";
import { type ComponentType, type ReactNode, useState } from "react";

import styles from "./Demo.module.css";
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
        Object.assign(result, { [name]: item.defaultValue?.value }),
      {},
    ),
  );

  return (
    <Flex mt="xl">
      <Box
        alignItems="stretch"
        border="1"
        className={iframe && styles.resize}
        display="flex"
        flexDirection="row"
        rounded="xl"
      >
        <Box flex="1" p="xl">
          {iframe ? (
            <DemoIframe height={height} src={iframe} />
          ) : (
            <Component {...props} />
          )}
        </Box>
        {Object.keys(propTypes).length > 0 && (
          <DemoControls
            onChange={setProps}
            propTypes={propTypes}
            props={props}
          />
        )}
      </Box>
      <Box className={styles.editor}>{children}</Box>
    </Flex>
  );
}
