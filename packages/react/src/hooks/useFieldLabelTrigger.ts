import { type RefObject, useEffect } from "react";

import { useFieldContext } from "../field/internals";

export const useFieldLabelTrigger = (
  ref: RefObject<HTMLButtonElement>,
  ariaLabelledBy: string | undefined,
) => {
  const { labelId = ariaLabelledBy } = useFieldContext("useFieldLabelTrigger");
  useEffect(() => {
    if (!labelId || !ref.current) {
      return;
    }

    const button = ref.current;
    const label = document.getElementById(labelId);
    if (!label) {
      return;
    }

    const onLabelClick = () => button.focus();
    label.addEventListener("click", onLabelClick);
    return () => label.removeEventListener("click", onLabelClick);
  }, [labelId, ref]);

  return labelId;
};
