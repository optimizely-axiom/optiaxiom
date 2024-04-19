import { type ReactNode, useCallback, useState } from "react";

type TransitionContext = {
  onMount: () => void;
  onUnmount: () => void;
  open: boolean;
};

type TransitionProps = {
  children: (props: TransitionContext) => ReactNode;
  open: boolean;
};

export const Transition = ({ children, open }: TransitionProps) => {
  const [mounted, setMounted] = useState(0);
  const onMount = useCallback(() => setMounted((mounted) => mounted + 1), []);
  const onUnmount = useCallback(() => setMounted((mounted) => mounted - 1), []);

  return (open || mounted > 0) && children({ onMount, onUnmount, open });
};

Transition.displayName = "@optiaxiom/react/Transition";
