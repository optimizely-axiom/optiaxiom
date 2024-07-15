import { type ComponentPropsWithRef, forwardRef, useState } from "react";

import { Box } from "../box";
import { Button } from "../button";
import { Input } from "../input";
import { IconCross } from "./IconCross";
import { IconSearch } from "./IconSearch";

type SearchProps = ComponentPropsWithRef<typeof Input>;

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ className, defaultValue = "", onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(defaultValue);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      if (onChange) {
        onChange(event);
      }
    };

    const handleClearInput = () => {
      setInputValue("");
      if (onChange) {
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <Box asChild {...props}>
        <Input
          endDecorator={
            inputValue && (
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
          value={inputValue}
        />
      </Box>
    );
  },
);

Search.displayName = "@optiaxiom/react/Search";
