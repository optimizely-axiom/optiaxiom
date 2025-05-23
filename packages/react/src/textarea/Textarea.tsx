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

export type TextareaProps = InputControlProps<
  typeof TextareaAutosize,
  Pick<ComponentPropsWithoutRef<typeof InputRoot>, "addonPointerEvents"> &
    Pick<
      ComponentPropsWithRef<typeof TextareaAutosize>,
      "maxRows" | "resize"
    > & {
      /**
       * Display content below the textarea.
       */
      addonAfter?: ReactNode;
      /**
       * Display content above the textarea.
       */
      addonBefore?: ReactNode;
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
    const Comp = asChild ? Slot : "textarea";
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
          <TextareaAutosize asChild>
            <Comp ref={ref} rows={props.rows ?? 3}>
              {children}
            </Comp>
          </TextareaAutosize>
        </InputControl>

        {addonAfter && (
          <InputAddon asChild>{fallbackSpan(addonAfter)}</InputAddon>
        )}
      </InputRoot>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
