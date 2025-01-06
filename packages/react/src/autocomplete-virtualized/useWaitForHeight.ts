import { useEffect, useState } from "react";

export const useWaitForHeight = () => {
  /**
   * We have to first wait for the element to be mounted which will give it the
   * initial total height for all items.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Next we have to wait for Radix to calculate available window height and set
   * max-height on the popover before we can display virtual items within that
   * scrollable popover element.
   */
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(true);
  }, [mounted]);

  return enabled;
};
