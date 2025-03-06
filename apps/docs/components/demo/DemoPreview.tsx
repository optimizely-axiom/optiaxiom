"use client";

import type { Props } from "react-docgen-typescript";

import { Box, Flex, Separator } from "@optiaxiom/react";
import {
  cloneElement,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const [resizing, setResizing] = useState<{
    w: number;
    x: number;
  }>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detach = () => setResizing(undefined);
    const resize = ({ clientX }: MouseEvent) => {
      if (!resizing || !ref.current) {
        return;
      }

      ref.current.style.width = `${resizing.w + clientX - resizing.x}px`;
    };

    document.addEventListener("mousemove", resize);
    document.addEventListener("pointerup", detach);
    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("pointerup", detach);
    };
  }, [resizing]);

  return (
    <Box
      alignItems="stretch"
      bg="bg.default"
      border="1"
      borderB="0"
      borderColor="border.tertiary"
      className={`${iframe ? styles.resize : ""} ${styles.root}`}
      display="flex"
      flexDirection={["column", "row"]}
      ref={ref}
    >
      <Flex
        flex="1"
        flexDirection="row"
        gap="0"
        justifyContent="center"
        maxW="full"
        p="32"
        pointerEvents={resizing ? "none" : undefined}
      >
        {iframe ? (
          <DemoIframe height={height} src={iframe} />
        ) : (
          cloneElement(component, props)
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
      {iframe && (
        <Box
          bg="bg.secondary"
          border="1"
          className={styles.handler}
          data-resizing={resizing ? "" : undefined}
          h="48"
          m="auto"
          onPointerDown={(event) =>
            setResizing({
              w: ref.current?.clientWidth ?? 0,
              x: event.clientX,
            })
          }
          rounded="sm"
          transition="colors"
          w="12"
        />
      )}
    </Box>
  );
}
