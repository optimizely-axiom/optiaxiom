import React, {
  type KeyboardEvent,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";

import { Badge } from "../badge";
import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Command } from "../command";
import { CommandEmpty } from "../command-empty";
import { CommandInput } from "../command-input";
import { CommandItem } from "../command-item";
import { CommandList } from "../command-list";
import { Flex } from "../flex";
import { IconCheck } from "../icons/IconCheck";
import { IconX } from "../icons/IconX";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";

type MultiSelectorProps = {
  dir?: "ltr" | "rtl";
  loop?: boolean;
  onValuesChange: (value: string[]) => void;
  values: string[];
} & React.ComponentPropsWithoutRef<typeof Command>;

interface MultiSelectContextProps {
  activeIndex: number;
  inputValue: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setOpen: (value: boolean) => void;
  value: string[];
}

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("useMultiSelect must be used within MultiSelectProvider");
  }
  return context;
};

const MultiSelector = ({
  children,
  dir,
  loop = false,
  onValuesChange: onValueChange,
  values: value,
  ...props
}: MultiSelectorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const onValueChangeHandler = useCallback(
    (val: string) => {
      if (value.includes(val)) {
        onValueChange(value.filter((item) => item !== val));
      } else {
        onValueChange([...value, val]);
      }
    },
    [onValueChange, value],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const moveNext = () => {
        const nextIndex = activeIndex + 1;
        setActiveIndex(
          nextIndex > value.length - 1 ? (loop ? 0 : -1) : nextIndex,
        );
      };

      const movePrev = () => {
        const prevIndex = activeIndex - 1;
        setActiveIndex(prevIndex < 0 ? value.length - 1 : prevIndex);
      };

      if ((e.key === "Backspace" || e.key === "Delete") && value.length > 0) {
        if (inputValue.length === 0) {
          if (activeIndex !== -1 && activeIndex < value.length) {
            onValueChange(value.filter((item) => item !== value[activeIndex]));
            const newIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1;
            setActiveIndex(newIndex);
          } else {
            onValueChange(
              value.filter((item) => item !== value[value.length - 1]),
            );
          }
        }
      } else if (e.key === "Enter") {
        setOpen(true);
      } else if (e.key === "Escape") {
        if (activeIndex !== -1) {
          setActiveIndex(-1);
        } else {
          setOpen(false);
        }
      } else if (dir === "rtl") {
        if (e.key === "ArrowRight") {
          movePrev();
        } else if (e.key === "ArrowLeft" && (activeIndex !== -1 || loop)) {
          moveNext();
        }
      } else {
        if (e.key === "ArrowLeft") {
          movePrev();
        } else if (e.key === "ArrowRight" && (activeIndex !== -1 || loop)) {
          moveNext();
        }
      }
    },
    [value, dir, activeIndex, loop, inputValue.length, onValueChange],
  );

  return (
    <MultiSelectContext.Provider
      value={{
        activeIndex,
        inputValue,
        onValueChange: onValueChangeHandler,
        open,
        setActiveIndex,
        setInputValue,
        setOpen,
        value,
      }}
    >
      <Command
        dir={dir}
        display="flex"
        flexDirection="column"
        gap="8"
        onKeyDown={handleKeyDown}
        overflow="visible"
        {...props}
      >
        {children}
      </Command>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectorTrigger = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, ...props }, ref) => {
    const { onValueChange, value } = useMultiSelect();

    const mousePreventDefault = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Flex
        alignItems="center"
        border="1"
        flexDirection="row"
        flexWrap="wrap"
        gap="4"
        px="4"
        py="8"
        ref={ref}
        rounded="md"
        w="288"
        {...sprinkleProps}
      >
        {value.map((item) => (
          <Badge
            alignItems="center"
            colorScheme="information"
            display="flex"
            gap="4"
            key={item}
            {...restProps}
          >
            <Text>{item}</Text>
            <Button
              aria-label={`Remove ${item} option`}
              aria-roledescription="button to remove option"
              icon={<IconX />}
              onClick={() => onValueChange(item)}
              onMouseDown={mousePreventDefault}
              size="sm"
            />
          </Badge>
        ))}
        {children}
      </Flex>
    );
  },
);

MultiSelectorTrigger.displayName = "@optiaxiom/react/MultiSelectorTrigger";

const MultiSelectorInput = forwardRef<
  React.ElementRef<typeof CommandInput>,
  React.ComponentPropsWithoutRef<typeof CommandInput>
>(({ ...props }, ref) => {
  const { activeIndex, inputValue, setActiveIndex, setInputValue, setOpen } =
    useMultiSelect();
  return (
    <CommandInput
      flex="1"
      ml="8"
      onBlur={() => setOpen(false)}
      onClick={() => setActiveIndex(-1)}
      onFocus={() => setOpen(true)}
      onValueChange={activeIndex === -1 ? setInputValue : undefined}
      ref={ref}
      style={{
        backgroundColor: "transparent",
        outline: "none",
      }}
      value={inputValue}
      {...props}
    />
  );
});

MultiSelectorInput.displayName = "@optiaxiom/react/MultiSelectorInput";

const MultiSelectorContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => {
  const { open } = useMultiSelect();
  return (
    <Box ref={ref} style={{ position: "relative" }}>
      {open && children}
    </Box>
  );
});

MultiSelectorContent.displayName = "@optiaxiom/react/MultiSelectorContent";

const MultiSelectorList = forwardRef<
  React.ElementRef<typeof CommandList>,
  React.ComponentPropsWithoutRef<typeof CommandList>
>(({ children }, ref) => {
  return (
    <CommandList ref={ref}>
      {children}
      <CommandEmpty>
        <span>No results found</span>
      </CommandEmpty>
    </CommandList>
  );
});

MultiSelectorList.displayName = "@optiaxiom/react/MultiSelectorList";

const MultiSelectorItem = forwardRef<
  React.ElementRef<typeof CommandItem>,
  { value: string } & React.ComponentPropsWithoutRef<typeof CommandItem>
>(({ children, value, ...props }, ref) => {
  const { onValueChange, setInputValue, value: Options } = useMultiSelect();

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const isIncluded = Options.includes(value);
  return (
    <CommandItem
      ref={ref}
      {...props}
      onMouseDown={mousePreventDefault}
      onSelect={() => {
        onValueChange(value);
        setInputValue("");
      }}
    >
      {children}
      {isIncluded && <IconCheck />}
    </CommandItem>
  );
});

MultiSelectorItem.displayName = "@optiaxiom/react/MultiSelectorItem";

export {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
};
