"use client";

import type { ComponentPropsWithRef } from "react";

import { Text } from "@optiaxiom/react";

export function App({
  lineClamp = "2",
}: Pick<ComponentPropsWithRef<typeof Text>, "lineClamp">) {
  return (
    <Text lineClamp={lineClamp}>
      Lorem Ipsum is a placeholder text commonly used in the design and printing
      industries. Despite its widespread use, the origins of Lorem Ipsum are
      somewhat mysterious. Several theories exist about who may have invented
      the text, but no one knows.
    </Text>
  );
}
