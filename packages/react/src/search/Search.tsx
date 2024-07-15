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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    const handleClearInput = () => {
      setValue("");
    };

    return (
      <Box asChild {...props}>
        <Input
          endDecorator={
            value && (
              <Button
                border="0"
                icon={<IconCross />}
                onClick={handleClearInput}
                size="sm"
              />
            )
          }
          onChange={handleInputChange}
          ref={ref}
          startDecorator={<IconSearch />}
          value={value}
        />
      </Box>
    );
  },
);

Search.displayName = "@optiaxiom/react/Search";
