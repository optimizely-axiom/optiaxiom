import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithRef, forwardRef, useRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Button } from "../button";
import { Input } from "../input";
import { IconCross } from "./IconCross";
import { IconSearch } from "./IconSearch";

type SearchProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  Omit<ComponentPropsWithRef<typeof Input>, "onChange">,
  {
    defaultValue?: string;
    onChange?: (value: string) => void;
    value?: string;
  }
>;

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ defaultValue = "", onChange, value: valueProp, ...props }, outerRef) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const [value, setValue] = useControllableState({
      defaultProp: defaultValue,
      onChange: onChange,
      prop: valueProp,
    });

    return (
      <Input
        endDecorator={
          value && (
            <Button
              appearance="secondary"
              icon={<IconCross />}
              onClick={() => setValue("")}
              size="sm"
            />
          )
        }
        onChange={(event) => {
          setValue(event.target.value);
        }}
        ref={ref}
        startDecorator={<IconSearch />}
        value={value}
        {...props}
      />
    );
  },
);

Search.displayName = "@optiaxiom/react/Search";
