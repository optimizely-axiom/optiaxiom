import type { ReactNode } from "react";

type DialogItem = {
  id: string;
  modal: DialogOptions & { element: ReactNode };
  onClose: () => void;
  open: boolean;
};

type DialogOptions = {
  onDismiss?: (event: Event) => void;
};

const EMPTY: DialogItem[] = [];

let id = 1;
const genId = () => {
  return "t" + id++;
};

type DialogKit = {
  clear: () => void;
  create: (element: ReactNode, options?: DialogOptions) => string;
  remove: (id: string) => void;
  store: [
    subscribe: (onStoreChange: () => void) => () => void,
    getSnapshot: () => DialogItem[],
    getServerSnapshot?: () => DialogItem[],
  ];
};

const createDialogKit = (): DialogKit => {
  let snapshot: DialogItem[] = [];

  const listeners = new Set<() => void>();
  const emit = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  const remove = (id: string) => {
    snapshot = snapshot.map((item) =>
      item.id === id ? { ...item, open: false } : item,
    );
    emit();
  };

  return {
    store: [
      (callback) => {
        listeners.add(callback);
        return () => listeners.delete(callback);
      },
      () => snapshot,
      () => EMPTY,
    ],

    clear: () => {
      for (const item of snapshot) {
        remove(item.id);
      }
    },

    create: (element, options) => {
      const id = genId();

      snapshot = [
        {
          id,
          modal: {
            ...options,
            element,
          },
          onClose: () => {
            snapshot = snapshot.filter((item) => item.id !== id);
            emit();
          },
          open: true,
        },
        ...snapshot,
      ];
      emit();

      return id;
    },

    remove,
  };
};

export const dialogkit = createDialogKit();
