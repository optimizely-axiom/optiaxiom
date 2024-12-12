import type { ReactElement, useSyncExternalStore } from "react";

type ToastItem = {
  id: string;
  open: boolean;
  toast:
    | ReactElement
    | {
        action?: {
          altText: string;
          label: string;
          onClick: () => void;
        };
        title: string;
        type?: "danger" | "neutral" | "success" | "warning";
      };
};

const EMPTY: ToastItem[] = [];

let id = 1;
const genId = () => {
  return "t" + id++;
};

type Toaster = {
  clear: () => void;
  create: (toast: ToastItem["toast"]) => string;
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

    create: (toast) => {
      const id = genId();
      snapshot = [...snapshot, { id, open: true, toast }];

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
