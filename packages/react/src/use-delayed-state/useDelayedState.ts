import { useEffect, useRef, useState } from "react";

/**
 * Same as useState but uses an additional control flag and only sets the value
 * when the control flag is true. Otherwise it stores the value in a queue and
 * applies it when the flag is true again.
 */
export function useDelayedState<S>(defaultValue: S, state: unknown) {
  const [value, setValue] = useState(defaultValue);
  const valueRef = useRef<S>();
  useEffect(() => {
    if (valueRef.current !== undefined) {
      setValue(valueRef.current);
      valueRef.current = undefined;
    }
  }, [state]);

  return [
    value,
    (value: S) => {
      if (state) {
        valueRef.current = undefined;
        setValue(value);
      } else {
        valueRef.current = value;
      }
    },
    valueRef,
  ] as const;
}
