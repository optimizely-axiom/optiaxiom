import * as RadixCheckbox from "@radix-ui/react-checkbox";
import * as RadixLabel from "@radix-ui/react-label";
import {
  type ComponentPropsWithRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Checkbox.css";

type CheckboxProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    defaultValue?: boolean;
    indeterminate?: boolean;
    label: string;
    readonly?: boolean;
  }
>;

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      className,
      defaultValue = false,
      indeterminate = false,
      label,
      readonly = false,
      ...props
    },
    ref,
  ) => {
    const [checked, setChecked] = useState(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleCheckedChange = (isChecked: "indeterminate" | boolean) => {
      if (isChecked === "indeterminate") {
        setChecked(false);
      } else {
        setChecked(isChecked);
      }
    };

    return (
      <Box {...props} ref={ref}>
        <Box className={styles.optionWrapper}>
          <RadixCheckbox.Root
            checked={checked}
            disabled={readonly}
            onCheckedChange={handleCheckedChange}
          >
            <input
              defaultChecked={defaultValue}
              readOnly={readonly}
              ref={inputRef}
              style={{ display: "none" }}
              type="checkbox"
            />
            <RadixCheckbox.Indicator>
              {indeterminate
                ? checkboxIcon.indeterminate
                : checked
                  ? checkboxIcon.checked
                  : checkboxIcon.unchecked}
            </RadixCheckbox.Indicator>
          </RadixCheckbox.Root>
          <Box>
            <RadixLabel.Root>{label}</RadixLabel.Root>
          </Box>
        </Box>
      </Box>
    );
  },
);

const checkboxIcon = {
  checked: (
    <svg
      fill="none"
      height="8"
      viewBox="0 0 12 8"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 3.47059L4.83333 7L10.5 1"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  indeterminate: (
    <svg
      fill="none"
      height="8"
      viewBox="0 0 12 8"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.85714 3.2C2.35714 3.2 2 3.56666 2 4C2 4.46666 2.35714 4.8 2.85714 4.8H9.14286C9.60714 4.8 10 4.46666 10 4C10 3.56666 9.60714 3.2 9.14286 3.2H2.85714Z"
        fill="white"
      />
    </svg>
  ),
  unchecked: (
    <svg
      fill="none"
      height="8"
      viewBox="0 0 12 8"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 3.47059L4.83333 7L10.5 1"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

Checkbox.displayName = "@optiaxiom/react/Checkbox";
