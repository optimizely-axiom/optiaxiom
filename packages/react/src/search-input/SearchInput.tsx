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

export type SearchInputProps = ComponentPropsWithRef<typeof Input> & {
  /**
   * Handler that is called when the input value is cleared using the cross button.
   */
  onValueClear?: () => void;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ addonBefore, className, onChange, onValueClear, ...props }, outerRef) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const [value, setValue] = useControllableState({
      caller: "@optiaxiom/react/SearchInput",
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
              onPointerDown={(event) => {
                event.preventDefault();
                forceValueChange("");
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
        asChild
        autoComplete="off"
        onChange={(event) => {
          onChange?.(event);
          setValue(event.target.value);
        }}
        ref={ref}
        type="search"
        {...styles.search({}, className)}
        {...props}
      >
        <input {...styles.input()} />
      </Input>
    );
  },
);

SearchInput.displayName = "@optiaxiom/react/SearchInput";
