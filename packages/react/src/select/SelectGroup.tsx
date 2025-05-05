import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxGroup } from "../listbox";

export type SelectGroupProps = ComponentPropsWithoutRef<typeof ListboxGroup>;

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  (props, ref) => {
    return <ListboxGroup ref={ref} {...props} />;
  },
);

SelectGroup.displayName = "@optiaxiom/react/SelectGroup";
