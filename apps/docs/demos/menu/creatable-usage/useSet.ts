import { useCallback, useState } from "react";

export const useSet = <T>(initialValue: T[]) => {
  const [list, setList] = useState(initialValue);
  return [
    list,
    {
      toggle: useCallback(
        (value: T) =>
          setList((prev) =>
            prev.includes(value)
              ? prev.filter((prevValue) => prevValue !== value)
              : [...prev, value],
          ),
        [],
      ),
    },
  ] as const;
};
