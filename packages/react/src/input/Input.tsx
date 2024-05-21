// import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { Box } from "../box";
import { type ExtendProps } from "../utils";
import { Slot } from "@radix-ui/react-slot";
import { type Recipe, recipe } from "./Input.recipe";
import { Text } from "../text";

type InputProps = ExtendProps<
  ComponentPropsWithRef<"input">,
  ComponentPropsWithRef<typeof Box>,
  { 
    id: string,
    as?:  "input"; 
    label?: string;
    note? : string
  } & Recipe
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ as = "input",id,  asChild, children, disabled = false, placeholder, required ,type, variant, label,note, ...props }, ref) => {
    const Comp = asChild ? Slot : as;

    return (
      <Box display="flex" flexDirection="column" maxW="sm">
      { label && <Text as="label" fontSize="sm" h="32" px="sm" pt="lg">{label} { required && <Text as="span" color="red.600">*</Text>}</Text>}
        <Box asChild fontFamily="sans" fontSize="md" ref={ref} {...recipe(props)}>
          <Comp required={required} placeholder={placeholder} type={variant} id= {id} >{children}</Comp>
        </Box> 
        {note && <Text as="p" fontSize="sm" px="sm" pt="0">{note}</Text>}
     </Box>
    );

  },
);

Input.displayName = "@optiaxiom/react/Input";
