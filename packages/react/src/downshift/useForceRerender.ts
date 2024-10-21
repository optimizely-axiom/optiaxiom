import { useEffect, useState } from "react";

export function useForceRerender(state: boolean | undefined) {
  const [, setState] = useState(false);
  useEffect(() => {
    if (state) {
      setState((flag) => !flag);
    }
  }, [state]);
}
