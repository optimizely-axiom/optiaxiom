import { useRef } from "react";

import {
  type CommandOption,
  resolveItemProperty,
  useCommandContext,
} from "../command/internals";
import { Popover } from "../popover";
import { Tooltip } from "../tooltip";
import { MenuSubContent } from "./MenuSubContent";
import { useMenuSubContext } from "./MenuSubContext";
import { MenuSubTrigger } from "./MenuSubTrigger";

export type MenuSubProps = {
  item: CommandOption;
};

export function MenuSub({ item }: MenuSubProps) {
  const { highlightedItem } = useCommandContext("@optiaxiom/react/MenuSub");
  const { open } = useMenuSubContext("@optiaxiom/react/MenuSub");

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Popover open={open && highlightedItem === item}>
      <Tooltip content={resolveItemProperty(item.disabledReason)}>
        <MenuSubTrigger contentRef={contentRef} item={item} />
      </Tooltip>
      <MenuSubContent item={item} ref={contentRef} />
    </Popover>
  );
}

MenuSub.displayName = "@optiaxiom/react/MenuSub";
