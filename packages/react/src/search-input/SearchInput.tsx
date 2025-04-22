import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithRef, forwardRef, useRef } from "react";

import { Button } from "../button";
import { Flex } from "../flex";
import { useObserveValue } from "../hooks";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { IconX } from "../icons/IconX";
import { Input } from "../input";
import * as styles from "./SearchInput.css";

type SearchProps = ComponentPropsWithRef<typeof Input> & {
  onValueClear?: () => void;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchProps>(
  ({ addonBefore, className, onChange, onValueClear, ...props }, outerRef) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const [value, setValue] = useControllableState({
      defaultProp: props.defaultValue,
      prop: props.value,
    });
    const forceValueChange = useObserveValue(innerRef, setValue);

    return (
      <Input
        addonAfter={
          value && (
            <Button
              appearance="subtle"
              aria-label="Clear"
              icon={value && <IconX />}
              onClick={() => {
                forceValueChange("");
                innerRef.current?.focus();
                onValueClear?.();
              }}
              tabIndex={-1}
              {...styles.clear()}
            />
          )
        }
        addonBefore={
          <Flex flexDirection="row" gap="8">
            <IconMagnifyingGlass />
            {addonBefore}
          </Flex>
        }
        addonPointerEvents="none"
        autoComplete="off"
        onChange={(event) => {
          onChange?.(event);
          setValue(event.target.value);
        }}
        ref={ref}
        type="search"
        {...styles.search({}, className)}
        {...props}
      />
    );
  },
);

SearchInput.displayName = "@optiaxiom/react/SearchInput";
