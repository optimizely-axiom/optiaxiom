import { atom, useAtom } from "jotai";
import { type ReactElement } from "react";

import type { ToastProps } from "../toast/Toast";

type ToasterToast = {
  component: ReactElement<ToastProps>;
  id: string;
};

type State = {
  toasts: ToasterToast[];
};
const DEFAULT_TOAST_DURATION = 5000;
export const toastAtom = atom<State>({ toasts: [] });
let id = 0;

const generateId = () => {
  return "t" + id++;
};

const useToaster = () => {
  const [, setStore] = useAtom(toastAtom);

  const addToast = (toastComponent: ReactElement<ToastProps>) => {
    const id = generateId();

    setStore((prev) => ({
      toasts: [
        ...prev.toasts,
        {
          component: toastComponent,
          id,
        },
      ],
    }));

    setTimeout(() => {
      removeToast(id);
    }, toastComponent.props.duration || DEFAULT_TOAST_DURATION);

    return {
      id,
      remove: () => removeToast(id),
    };
  };

  const removeToast = (id: string) => {
    setStore((prev) => ({
      toasts: prev.toasts.filter((t) => t.id !== id),
    }));
  };

  const clearAllToasts = () => {
    setStore({ toasts: [] });
  };

  return {
    clearAll: clearAllToasts,
    create: addToast,
    remove: removeToast,
  };
};

export { useToaster };
