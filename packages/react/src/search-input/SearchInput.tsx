import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithRef,
  forwardRef,
  useRef,
  useState,
} from "react";

import { Button } from "../button";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { IconX } from "../icons/IconX";
import { Input } from "../input";
import * as styles from "./SearchInput.css";

type SearchProps = {
  onValueClear?: () => void;
} & ComponentPropsWithRef<typeof Input>;

export const SearchInput = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      defaultValue = "",
      onChange,
      onValueClear,
      value: valueProp,
      ...props
    },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    const [innerValue, setValue] = useState(defaultValue);
    const value = typeof valueProp === "undefined" ? innerValue : valueProp;

    return (
      <Input
        addonAfter={
          value && (
            <Button
              appearance="subtle"
              aria-label="Clear"
              icon={value && <IconX />}
              onClick={() => {
                if (!innerRef.current) {
                  return;
                }

                forceValueChange(innerRef.current, "");
                innerRef.current.focus();
                onValueClear?.();
              }}
              tabIndex={-1}
              {...styles.clear()}
            />
          )
        }
        addonBefore={<IconMagnifyingGlass />}
        autoComplete="off"
        onChange={(event) => {
          onChange?.(event);
          setValue(event.target.value);
        }}
        ref={ref}
        type="search"
        value={value}
        {...styles.search({}, className)}
        {...props}
      />
    );
  },
);

SearchInput.displayName = "@optiaxiom/react/SearchInput";

function forceValueChange(input: HTMLInputElement, value: string) {
  Object.getOwnPropertyDescriptor(
    input.constructor.prototype,
    "value",
  )?.set?.call(input, value);
  input.dispatchEvent(new Event("change", { bubbles: true }));
}
