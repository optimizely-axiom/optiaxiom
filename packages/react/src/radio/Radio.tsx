import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { useRadioGroupContext } from "../radio-group-context";
import { ToggleInput } from "../toggle-input";
import { ToggleInputContent } from "../toggle-input-content";
import { ToggleInputControl } from "../toggle-input-control";
import { ToggleInputDescription } from "../toggle-input-description";
import { ToggleInputHiddenInput } from "../toggle-input-hidden-input";
import { ToggleInputLabel } from "../toggle-input-label";
import * as styles from "./Radio.css";

type RadioProps = BoxProps<
  typeof ToggleInputHiddenInput,
  {
    /**
     * Add helper text after the label.
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
    const groupContext = useRadioGroupContext("Radio");

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
      <ToggleInput
        description={!!description}
        {...styles.radio({}, className)}
        {...boxProps}
      >
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
