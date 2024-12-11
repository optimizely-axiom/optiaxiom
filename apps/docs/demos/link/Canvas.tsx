import { Link, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactNode } from "react";

export const Canvas = ({
  appearance,
  children,
}: {
  appearance: ComponentPropsWithRef<typeof Link>["appearance"];
  children: ReactNode;
}) => (
  <Text
    bg={appearance === "inverse" ? "bg.default.inverse" : "bg.default"}
    px="12"
    py="8"
    rounded="sm"
  >
    {children}
  </Text>
);
