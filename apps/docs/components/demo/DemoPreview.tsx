"use client";

/// <reference types="react/canary" />

import type { Props } from "react-docgen-typescript";

import { Box, Group, Separator } from "@optiaxiom/react";
import {
  cloneElement,
  type ReactElement,
  use,
  useEffect,
  useRef,
  useState,
} from "react";

import { DemoControls } from "./DemoControls";
import { DemoIframe } from "./DemoIframe";
import styles from "./DemoPreview.module.css";

export function DemoPreview({
  component,
  propTypes = {},
  resizable,
  scrollable,
}: {
  component: ReactElement;
  propTypes: Props | undefined;
  resizable?: boolean;
  scrollable?: boolean;
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

  // A server-rendered demo can arrive as a lazy wrapper around a pending RSC
  // chunk; cloning that yields an element with an undefined type.
  const element = isLazyElement(component)
    ? use<ReactElement>(component._payload)
    : component;

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
      className={`${resizable ? styles.resize : ""} ${styles.root}`}
      display="flex"
      flexDirection={["column", "row"]}
      ref={ref}
    >
      <Group
        flex="1"
        gap="0"
        justifyContent={scrollable ? "start" : "center"}
        maxW="full"
        overflow="auto"
        p={resizable ? undefined : "32"}
      >
        {resizable ? (
          <DemoIframe disablePointerEvents={!!resizing} scrollable={scrollable}>
            {cloneElement(element, props)}
          </DemoIframe>
        ) : (
          cloneElement(element, props)
        )}
      </Group>
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
      {resizable && (
        <Box
          bg="bg.secondary"
          border="1"
          className={styles.handler}
          data-resizing={resizing ? "" : undefined}
          h="48"
          m="auto"
          onPointerDown={(event) => {
            if (event.button !== 0) {
              return;
            }
            setResizing({
              w: ref.current?.clientWidth ?? 0,
              x: event.clientX,
            });
          }}
          rounded="sm"
          transition="colors"
          w="12"
        />
      )}
    </Box>
  );
}

const isLazyElement = (
  value: unknown,
): value is { _payload: PromiseLike<ReactElement> } =>
  typeof value === "object" &&
  value !== null &&
  "$$typeof" in value &&
  value.$$typeof === Symbol.for("react.lazy") &&
  "_payload" in value &&
  typeof value._payload === "object" &&
  value._payload !== null &&
  "then" in value._payload;
