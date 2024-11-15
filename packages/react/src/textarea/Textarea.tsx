import { Slot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  forwardRef,
  type ReactNode,
} from "react";

import { InputAddon } from "../input-addon";
import { InputControl, type InputControlProps } from "../input-control";
import { InputRoot } from "../input-root";
import { extractSprinkles } from "../sprinkles";
import { TextareaAutosize } from "../textarea-autosize";
import { fallbackSpan } from "../utils";

type TextareaProps = InputControlProps<
  typeof TextareaAutosize,
  {
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
    children?: never;
    /**
     * Limits the height of the textarea when `resize=auto` is used.
     */
    maxRows?: ComponentPropsWithRef<typeof TextareaAutosize>["maxRows"];
    resize?: ComponentPropsWithRef<typeof TextareaAutosize>["resize"];
    size?: never;
  } & Pick<ComponentPropsWithoutRef<typeof InputRoot>, "addonPointerEvents">
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
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <InputRoot
        addonPointerEvents={addonPointerEvents}
        className={className}
        flexDirection="column"
        style={style}
        {...sprinkleProps}
      >
        {addonBefore && (
          <InputAddon asChild>{fallbackSpan(addonBefore)}</InputAddon>
        )}

        <InputControl asChild p="xs" size="lg" {...restProps}>
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
