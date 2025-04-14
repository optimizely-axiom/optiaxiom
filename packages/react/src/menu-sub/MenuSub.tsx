import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useRef, useState } from "react";

import { type CommandOption, useCommandContext } from "../command-context";
import { useMenuContext } from "../menu-context";
import { MenuSubContent } from "../menu-sub-content";
import { MenuSubProvider } from "../menu-sub-context";
import { MenuSubTrigger } from "../menu-sub-trigger";

type MenuSubProps = {
  children?: React.ReactNode;
  item: CommandOption;
};

export function MenuSub({ children, item }: MenuSubProps) {
  const { activePath, setActivePath } = useMenuContext(
    "@optiaxiom/react/MenuSub",
  );
  const { items } = useCommandContext("@optiaxiom/react/MenuSub");
  const index = items.indexOf(item);

  const [presence, setPresence] = useState<boolean>();

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <MenuSubProvider
      contentRef={contentRef}
      open={activePath[0] === index}
      presence={presence}
      setOpen={() => {
        setActivePath((path) =>
          path.at(-1) === index ? path.slice(0, -1) : path,
        );
      }}
      setPresence={setPresence}
    >
      {children ?? (
        <DropdownMenu modal={false} open={activePath[0] === index || presence}>
          <MenuSubTrigger item={item} />
          <MenuSubContent item={item} />
        </DropdownMenu>
      )}
    </MenuSubProvider>
  );
}

MenuSub.displayName = "@optiaxiom/react/MenuSub";
