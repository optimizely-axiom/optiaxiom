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
import * as styles from "./Search.css";

type SearchProps = ComponentPropsWithRef<typeof Input>;

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    { className, defaultValue = "", onChange, value: valueProp, ...props },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    const [innerValue, setValue] = useState(defaultValue);
    const value = typeof valueProp === "undefined" ? innerValue : valueProp;

    return (
      <Input
        autoComplete="off"
        endDecorator={
          value && (
            <Button
              appearance="secondary"
              icon={value && <IconX />}
              onClick={() => {
                if (!innerRef.current) {
                  return;
                }

                forceValueChange(innerRef.current, "");
                innerRef.current.focus();
              }}
              {...styles.clear()}
            />
          )
        }
        onChange={(event) => {
          onChange?.(event);
          setValue(event.target.value);
        }}
        ref={ref}
        startDecorator={<IconMagnifyingGlass />}
        type="search"
        value={value}
        {...styles.search({}, className)}
        {...props}
      />
    );
  },
);

Search.displayName = "@optiaxiom/react/Search";

function forceValueChange(input: HTMLInputElement, value: string) {
  Object.getOwnPropertyDescriptor(
    input.constructor.prototype,
    "value",
  )?.set?.call(input, value);
  input.dispatchEvent(new Event("change", { bubbles: true }));
}
