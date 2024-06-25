import { type RefObject, createContext } from "react";

export const PresenceContext = createContext({
  isPresent: true,
  onExitComplete: (_id: RefObject<undefined>) => {},
  register: (_id: RefObject<undefined>) => {},
});
