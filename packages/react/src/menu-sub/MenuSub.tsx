import { useRef } from "react";

import { type CommandOption, useCommandContext } from "../command-context";
import { useMenuContext } from "../menu-context";
import { useMenuNestedContext } from "../menu-nested-context";
import { MenuSubContent } from "../menu-sub-content";
import { MenuSubProvider } from "../menu-sub-context";
import { MenuSubTrigger } from "../menu-sub-trigger";
import { Popover } from "../popover";

type MenuSubProps = {
  children?: React.ReactNode;
  item: CommandOption;
};

export function MenuSub({ children, item }: MenuSubProps) {
  const { activePath, setActivePath } = useMenuContext(
    "@optiaxiom/react/MenuSub",
  );
  const { items } = useCommandContext("@optiaxiom/react/MenuSub");
  const { level } = useMenuNestedContext("@optiaxiom/react/MenuSub");
  const index = items.indexOf(item);

  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <MenuSubProvider
      contentRef={contentRef}
      inputRef={inputRef}
      level={level}
      open={activePath[level] === index}
      setOpen={() => {
        setActivePath((path) =>
          path[level] === index ? path.slice(0, level) : path,
        );
      }}
    >
      {children ?? (
        <Popover open={activePath[level] === index}>
          <MenuSubTrigger item={item} />
          <MenuSubContent item={item} />
        </Popover>
      )}
    </MenuSubProvider>
  );
}

MenuSub.displayName = "@optiaxiom/react/MenuSub";
