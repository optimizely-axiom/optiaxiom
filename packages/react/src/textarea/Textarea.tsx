import { createSlot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  forwardRef,
  type ReactNode,
} from "react";

import { extractBoxProps } from "../box";
import {
  InputAddon,
  InputControl,
  type InputControlProps,
  InputRoot,
} from "../input";
import { fallbackSpan } from "../utils";
import { TextareaAutosize } from "./TextareaAutosize";

const Slot = createSlot("@optiaxiom/react/Textarea");

type TextareaProps = InputControlProps<
  typeof TextareaAutosize,
  Pick<ComponentPropsWithoutRef<typeof InputRoot>, "addonPointerEvents"> & {
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
    children?: never;
    /**
     * Limits the height of the textarea when `resize=auto` is used.
     */
    maxRows?: ComponentPropsWithRef<typeof TextareaAutosize>["maxRows"];
    resize?: ComponentPropsWithRef<typeof TextareaAutosize>["resize"];
    size?: never;
  }
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      addonAfter,
      addonBefore,
      addonPointerEvents,
      asChild,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : TextareaAutosize;
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <InputRoot
        addonPointerEvents={addonPointerEvents}
        className={className}
        flexDirection="column"
        style={style}
        {...boxProps}
      >
        {addonBefore && (
          <InputAddon asChild>{fallbackSpan(addonBefore)}</InputAddon>
        )}

        <InputControl asChild p="8" size="lg" {...restProps}>
          <Comp ref={ref} rows={props.rows ?? 3}>
            {children}
          </Comp>
        </InputControl>

        {addonAfter && (
          <InputAddon asChild>{fallbackSpan(addonAfter)}</InputAddon>
        )}
      </InputRoot>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
