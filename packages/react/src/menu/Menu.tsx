import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef } from "react";

type MenuProps = ComponentPropsWithoutRef<typeof RadixMenu.Root>;

export const Menu = (props: MenuProps) => {
  return <RadixMenu.Root {...props} />;
};

Menu.displayName = "@optiaxiom/react/Menu";
