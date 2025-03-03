import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithRef,
  forwardRef,
  useRef,
  useState,
} from "react";

import { Button } from "../button";
import { Flex } from "../flex";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { IconX } from "../icons/IconX";
import { Input } from "../input";
import { forceValueChange } from "../utils";
import * as styles from "./SearchInput.css";

type SearchProps = ComponentPropsWithRef<typeof Input> & {
  onValueClear?: () => void;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      addonBefore,
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
        value={value}
        {...styles.search({}, className)}
        {...props}
      />
    );
  },
);

SearchInput.displayName = "@optiaxiom/react/SearchInput";
