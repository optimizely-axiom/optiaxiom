import { IconSearch } from "@optiaxiom/icons/IconSearch";
import { IconXmark } from "@optiaxiom/icons/IconXmark";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithRef, forwardRef, useRef } from "react";

import { Button } from "../button";
import { Group } from "../group";
import { useObserveValue } from "../hooks";
import { Input } from "../input";
import { useMessages } from "../locale";
import * as styles from "./SearchInput.css";

export type SearchInputProps = ComponentPropsWithRef<typeof Input> & {
  /**
   * Handler that is called when the input value is cleared using the cross button.
   */
  onValueClear?: () => void;
};

/**
 * Basic search input field with clear button.
 *
 * @category form
 * @since 0.1.0
 * @extends Input
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ addonBefore, className, onChange, onValueClear, ...props }, outerRef) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const messages = useMessages();

    const [value, setValue] = useControllableState({
      caller: "@optiaxiom/react/SearchInput",
      defaultProp: props.defaultValue,
      prop: props.value,
    });
    const [ref, forceValueChange] = useObserveValue(
      innerRef,
      outerRef,
      setValue,
    );

    return (
      <Input
        addonAfter={
          value && (
            <Button
              appearance="subtle"
              aria-label={messages["Clear"]}
              icon={value && <IconXmark />}
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
          <Group gap="8">
            <IconSearch />
            {addonBefore}
          </Group>
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
