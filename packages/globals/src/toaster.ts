import type { ReactElement, RefObject, useSyncExternalStore } from "react";

type ToastItem = {
  id: string;
  open: boolean;
  ref: RefObject<HTMLElement>;
  toast: ReactElement | (ToastOptions & { title: string });
};

type ToastOptions = {
  action?: string;
  onAction?: () => void;
  type?: "danger" | "information" | "neutral" | "success" | "warning";
};

const EMPTY: ToastItem[] = [];

let id = 1;
const genId = () => {
  return "t" + id++;
};

type Toaster = {
  clear: () => void;
  create: (
    ...args: [message: string, options?: ToastOptions] | [toast: ReactElement]
  ) => string;
  remove: (id: string) => void;
  store: Parameters<typeof useSyncExternalStore<ToastItem[]>>;
};

export const createToaster = (): Toaster => {
  let snapshot: ToastItem[] = [];

  const listeners = new Set<() => void>();
  const emit = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  return {
    store: [
      (callback: () => void) => {
        listeners.add(callback);
        return () => listeners.delete(callback);
      },
      () => snapshot,
      () => EMPTY,
    ],

    clear: () => {
      snapshot = [];
      emit();
    },

    create: (...args) => {
      const toast =
        typeof args[0] === "string"
          ? {
              ...args[1],
              title: args[0],
            }
          : args[0];
      const id = genId();
      snapshot = [
        ...snapshot,
        {
          id,
          open: true,
          ref: { current: null },
          toast,
        },
      ];

      emit();

      return id;
    },

    remove: (id) => {
      snapshot = snapshot.map((item) =>
        item.id === id ? { ...item, open: false } : item,
      );
      emit();

      setTimeout(() => {
        snapshot = snapshot.filter((item) => item.id !== id);
        emit();
      }, 200);
    },
  };
};

export const toaster = createToaster();
