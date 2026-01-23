import { createSlot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  forwardRef,
  type ReactNode,
} from "react";

import { extractBoxProps } from "../box";
import { Group } from "../group";
import {
  InputAddon,
  InputControl,
  type InputControlProps,
  InputRoot,
} from "../input";
import { SuggestionPopover } from "../suggestion";
import { fallbackSpan } from "../utils";
import * as styles from "./Textarea.css";
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
      /**
       * The number of rows to display.
       */
      rows?: ComponentPropsWithoutRef<"textarea">["rows"];
      size?: never;
    }
>;

/**
 * Multi-line text field for capturing user input.
 *
 * @category form
 * @since 0.1.0
 */
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

        <InputAddon {...styles.addon()}>
          {props.value !== undefined && (
            <Group justifyContent="end">
              <SuggestionPopover />
            </Group>
          )}
          {addonAfter}
        </InputAddon>
      </InputRoot>
    );
  },
);

Textarea.displayName = "@optiaxiom/react/Textarea";
