import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithRef,
  forwardRef,
  useRef,
  useState,
} from "react";

import { Button } from "../button";
import { Input } from "../input";
import { IconCross } from "./IconCross";
import { IconSearch } from "./IconSearch";

type SearchProps = ComponentPropsWithRef<typeof Input>;

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ defaultValue = "", onChange, value: valueProp, ...props }, outerRef) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    const [innerValue, setValue] = useState(defaultValue);
    const value = typeof valueProp === "undefined" ? innerValue : valueProp;

    return (
      <Input
        endDecorator={
          value && (
            <Button
              appearance="secondary"
              icon={value && <IconCross />}
              onClick={() => {
                if (!innerRef.current) {
                  return;
                }
                Object.getOwnPropertyDescriptor(
                  innerRef.current.constructor.prototype,
                  "value",
                )?.set?.call(innerRef.current, "");
                innerRef.current?.dispatchEvent(
                  new Event("change", { bubbles: true }),
                );
                innerRef.current.focus();
              }}
              size="sm"
            />
          )
        }
        onChange={(event) => {
          onChange?.(event);
          setValue(event.target.value);
        }}
        ref={ref}
        startDecorator={<IconSearch />}
        type="search"
        value={value}
        {...props}
      />
    );
  },
);

Search.displayName = "@optiaxiom/react/Search";
