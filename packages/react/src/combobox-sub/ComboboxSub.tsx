import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useEffect, useRef, useState } from "react";

import { useComboboxContext } from "../combobox-context";
import { ComboboxSubContent } from "../combobox-sub-content";
import { ComboboxSubProvider } from "../combobox-sub-context";
import { ComboboxSubTrigger } from "../combobox-sub-trigger";
import { type CommandOption, useCommandContext } from "../command-context";

type ComboboxSubProps = {
  children?: React.ReactNode;
  item: CommandOption;
};

export function ComboboxSub({ children, item }: ComboboxSubProps) {
  const { open } = useComboboxContext("@optiaxiom/react/ComboboxSub");
  const { activePath, items, setActivePath } = useCommandContext(
    "@optiaxiom/react/ComboboxSub",
  );
  const index = items.indexOf(item);

  useEffect(() => {
    if (!open) {
      setActivePath((path) =>
        path.at(-1) === index ? path.slice(0, -1) : path,
      );
    }
  }, [index, open, setActivePath]);
  const [presence, setPresence] = useState<boolean>();

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <ComboboxSubProvider
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
          <ComboboxSubTrigger item={item} />
          <ComboboxSubContent item={item} />
        </DropdownMenu>
      )}
    </ComboboxSubProvider>
  );
}

ComboboxSub.displayName = "@optiaxiom/react/ComboboxSub";
