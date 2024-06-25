import { useContext, useEffect, useRef } from "react";

import { PresenceContext } from "./PresenceContext";

export const usePresence = () => {
  const { isPresent, onExitComplete, register } = useContext(PresenceContext);

  const id = useRef();
  useEffect(() => {
    return register(id);
  }, [id, register]);

  return !isPresent
    ? ([false, () => onExitComplete(id)] as const)
    : ([true] as const);
};
