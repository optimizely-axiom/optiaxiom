import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import {
  ToggleInput,
  ToggleInputContent,
  ToggleInputControl,
  ToggleInputDescription,
  ToggleInputHiddenInput,
  ToggleInputLabel,
} from "../toggle-input";
import * as styles from "./Radio.css";
import { useRadioGroupContext } from "./RadioGroupContext";

export type RadioProps = BoxProps<
  typeof ToggleInputHiddenInput,
  {
    /**
     * Add secondary text after the label.
     */
    description?: ReactNode;
  }
>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
    const { boxProps, restProps } = extractBoxProps(props);
    const groupContext = useRadioGroupContext("@optiaxiom/react/Radio");

    if (groupContext) {
      if ("checked" in props) {
        throw new Error(
          `Cannot use \`checked\` prop when \`Radio\` is used within \`RadioGroup\``,
        );
      }
      if (props.value === undefined) {
        throw new Error(
          `Must use \`value\` prop when \`Radio\` is used within \`RadioGroup\``,
        );
      }
    }

    return (
      <ToggleInput {...styles.radio({}, className)} {...boxProps}>
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

        <ToggleInputControl {...styles.control({ shift: Boolean(children) })}>
          <Box {...styles.indicator()}></Box>
        </ToggleInputControl>

        {(children || description) && (
          <ToggleInputContent>
            {children && <ToggleInputLabel>{children}</ToggleInputLabel>}

            {description && (
              <ToggleInputDescription>{description}</ToggleInputDescription>
            )}
          </ToggleInputContent>
        )}
      </ToggleInput>
    );
  },
);

Radio.displayName = "@optiaxiom/react/Radio";
