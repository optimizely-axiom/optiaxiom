import { ModalLayer } from "@optiaxiom/react";
import { components, type GroupBase } from "react-select";

export const MenuPortal: typeof components.MenuPortal<
  unknown,
  false,
  GroupBase<unknown>
> = ({ children, ...props }) => {
  return (
    <components.MenuPortal {...props}>
      {props.appendTo ? <ModalLayer>{children}</ModalLayer> : children}
    </components.MenuPortal>
  );
};
