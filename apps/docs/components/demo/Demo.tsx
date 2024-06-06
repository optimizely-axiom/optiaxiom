import { Box, Flex } from "@optiaxiom/react";
import {
  type ComponentPropsWithRef,
  type ComponentType,
  type ReactNode,
  useState,
} from "react";

import styles from "./Demo.module.css";
import { DemoControls } from "./DemoControls";
import { DemoIframe } from "./DemoIframe";

export function Demo({
  children,
  component: Component,
  controls,
  height,
  iframe,
}: {
  children: ReactNode;
  component: ComponentType;
  controls: ComponentPropsWithRef<typeof DemoControls>["controls"];
  height?: string;
  iframe?: string;
}) {
  const [props, setProps] = useState(() =>
    (controls ?? []).reduce(
      (result, control) =>
        Object.assign(result, { [control.prop]: control.defaultValue }),
      {},
    ),
  );

  return (
    <Flex mt="xl">
      <Box
        alignItems="stretch"
        border="1"
        display="flex"
        flexDirection="row"
        rounded="xl"
      >
        <Box className={iframe && styles.resize} flex="1" p="xl">
          {iframe ? (
            <DemoIframe height={height} src={iframe} />
          ) : (
            <Component {...props} />
          )}
        </Box>
        {controls && (
          <DemoControls controls={controls} onChange={setProps} props={props} />
        )}
      </Box>
      <Box className={styles.editor}>{children}</Box>
    </Flex>
  );
}
