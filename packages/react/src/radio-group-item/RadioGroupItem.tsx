import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { useRadioGroupContext } from "../radio-group-context";
import { extractSprinkles } from "../sprinkles";
import { ToggleInput } from "../toggle-input";
import { ToggleInputContent } from "../toggle-input-content";
import { ToggleInputControl } from "../toggle-input-control";
import { ToggleInputDescription } from "../toggle-input-description";
import { ToggleInputHiddenInput } from "../toggle-input-hidden-input";
import { ToggleInputLabel } from "../toggle-input-label";
import * as styles from "./RadioGroupItem.css";

type RadioGroupItemProps = BoxProps<
  typeof ToggleInputHiddenInput,
  {
    description?: ReactNode;
  }
>;

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  (
    {
      children,
      className,
      description,
      disabled,
      name,
      onBlur,
      onChange,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const groupContext = useRadioGroupContext("RadioGroupItem");

    if (groupContext) {
      if ("checked" in props) {
        throw new Error(
          `Cannot use \`checked\` prop when \`RadioGroupItem\` is used within \`RadioGroup\``,
        );
      }
      if (props.value === undefined) {
        throw new Error(
          `Must use \`value\` prop when \`RadioGroupItem\` is used within \`RadioGroup\``,
        );
      }
    }

    return (
      <ToggleInput {...styles.radio({}, className)} {...sprinkleProps}>
        <ToggleInputHiddenInput
          checked={
            groupContext?.value !== undefined
              ? groupContext.value === props.value
              : undefined
          }
          defaultChecked={
            groupContext?.defaultValue !== undefined
              ? groupContext.defaultValue === props.value
              : undefined
          }
          disabled={groupContext?.disabled ?? disabled}
          name={groupContext?.name ?? name}
          onBlur={groupContext?.onBlur ?? onBlur}
          onChange={groupContext?.onChange ?? onChange}
          ref={ref}
          type="radio"
          {...styles.input()}
          {...restProps}
        />

        <ToggleInputControl {...styles.control()}>
          <Box {...styles.indicator()}></Box>
        </ToggleInputControl>

        <ToggleInputContent>
          <ToggleInputLabel>{children}</ToggleInputLabel>

          {description && (
            <ToggleInputDescription>{description}</ToggleInputDescription>
          )}
        </ToggleInputContent>
      </ToggleInput>
    );
  },
);

RadioGroupItem.displayName = "@optiaxiom/react/RadioGroupItem";
