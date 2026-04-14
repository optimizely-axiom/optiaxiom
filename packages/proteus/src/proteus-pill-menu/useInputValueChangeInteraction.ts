import { useEffect, useRef, useState } from "react";

import type { ProteusEventHandler } from "../proteus-document/schemas";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useResolveProteusValues } from "../proteus-document/useResolveProteusValues";
import { useProteusValue } from "../use-proteus-value";

export const useInputValueChangeInteraction = ({
  inputName,
  onInputValueChange,
}: {
  inputName: string | undefined;
  onInputValueChange: ProteusEventHandler | undefined;
}) => {
  const { onEvent } = useProteusDocumentContext(
    "@optiaxiom/proteus/useInputValueChangeInteraction",
  );

  const inputValue = useProteusValue({ path: inputName ?? "" });
  const resolvedOnInputValueChange = useResolveProteusValues(
    (onInputValueChange ?? {}) as Record<string, unknown>,
  ) as ProteusEventHandler;
  const resolvedRef = useRef(resolvedOnInputValueChange);
  resolvedRef.current = resolvedOnInputValueChange;
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const [loading, setLoading] = useState<"spinner">();
  const requestIdRef = useRef(0);
  useEffect(() => {
    if (inputName && onInputValueChange) {
      const id = ++requestIdRef.current;
      void (async () => {
        setLoading("spinner");
        await onEventRef.current(resolvedRef.current);
        if (requestIdRef.current === id) {
          setLoading(undefined);
        }
      })();
    }
  }, [inputName, inputValue, onInputValueChange]);

  return { inputValue, loading };
};
