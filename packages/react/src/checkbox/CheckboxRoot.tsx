import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useEffect, useRef } from "react";

import { type BoxProps, extractBoxProps } from "../box";
import { ToggleInput, ToggleInputHiddenInput } from "../toggle-input";

export type CheckboxRootProps = BoxProps<typeof ToggleInputHiddenInput>;

export const CheckboxRoot = forwardRef<HTMLInputElement, CheckboxRootProps>(
  ({ children, ...props }, outerRef) => {
    const { boxProps, restProps } = extractBoxProps(props);

    const checked = props["aria-checked"];
    const innerRef = useRef<HTMLInputElement>();
    useEffect(() => {
      if (!innerRef.current) {
        return;
      }

      innerRef.current.indeterminate = checked === "mixed";
    }, [checked]);
    const ref = useComposedRefs(innerRef, outerRef);

    return (
      <ToggleInput {...boxProps}>
        <ToggleInputHiddenInput ref={ref} {...restProps} />

        {children}
      </ToggleInput>
    );
  },
);

CheckboxRoot.displayName = "@optiaxiom/react/CheckboxRoot";
