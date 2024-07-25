import { useEffect, useState } from "react";

import type { ToastProps } from "../toast/Toast";

const DEFAULT_TOAST_REMOVE_DELAY = 1000;

type ToasterToast = {
  duration?: number;
  id: string;
} & ToastProps;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

type ActionType = typeof actionTypes;

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

interface State {
  toasts: ToasterToast[];
}

let memoryState: State = { toasts: [] };

const genId = () => {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
};

type Action =
  | {
      toast: ToasterToast;
      type: ActionType["ADD_TOAST"];
    }
  | {
      toastId?: ToasterToast["id"];
      type: ActionType["DISMISS_TOAST"];
    }
  | {
      toastId?: ToasterToast["id"];
      type: ActionType["REMOVE_TOAST"];
    };

const listeners: Array<(state: State) => void> = [];

const addToRemoveQueue = (toastId: string, duration: number) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      toastId: toastId,
      type: "REMOVE_TOAST",
    });
  }, duration);

  toastTimeouts.set(toastId, timeout);
};

const dispatch = (action: Action) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        const toast = state.toasts.find((t) => t.id === toastId);
        if (toast) {
          addToRemoveQueue(
            toastId,
            toast.duration || DEFAULT_TOAST_REMOVE_DELAY,
          );
        }
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(
            toast.id,
            toast.duration || DEFAULT_TOAST_REMOVE_DELAY,
          );
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const toast = ({ duration, ...props }: Omit<ToasterToast, "id">) => {
  const id = genId();
  const actualDuration = duration || DEFAULT_TOAST_REMOVE_DELAY;

  const dismiss = () => dispatch({ toastId: id, type: "DISMISS_TOAST" });

  dispatch({
    toast: {
      ...props,
      duration: actualDuration,
      id,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
      open: true,
    },
    type: "ADD_TOAST",
  });

  addToRemoveQueue(id, actualDuration);

  return {
    dismiss,
    id: id,
  };
};

const clearAllToasts = () => dispatch({ type: "REMOVE_TOAST" });

const useToast = () => {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state.toasts]);

  return {
    ...state,
    clearAllToasts,
    dismiss: (toastId?: string) => dispatch({ toastId, type: "DISMISS_TOAST" }),
    toast,
  };
};

export { useToast };
