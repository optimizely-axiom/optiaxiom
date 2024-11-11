import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandInput } from "../command-input";
import { DialogClose } from "../dialog-close";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import * as styles from "./SpotlightInput.css";

type SpotlightInputProps = ComponentPropsWithoutRef<typeof CommandInput>;

export const SpotlightInput = forwardRef<HTMLInputElement, SpotlightInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <CommandInput
        addonAfter={
          <DialogClose fontSize="xs" fontWeight="500" h="xs" size="sm">
            ESC
          </DialogClose>
        }
        addonBefore={<IconMagnifyingGlass />}
        // autoCapitalize="off"
        // autoCorrect="off"
        // enterKeyHint="go"
        ref={ref}
        size="2xl"
        // spellCheck="false"
        {...styles.input({}, className)}
        {...props}
      />
    );
  },
);

SpotlightInput.displayName = "@optiaxiom/react/SpotlightInput";
