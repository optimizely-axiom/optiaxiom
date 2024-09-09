import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { atom, getDefaultStore } from "jotai";

import type { Toast } from "../toast/Toast";

type ToastElement = ReactElement<ComponentPropsWithoutRef<typeof Toast>>;

let id = 1;
const genId = () => {
  return "t" + id++;
};

type Store = ReturnType<typeof getDefaultStore>;

export const createToaster = (store: Store = getDefaultStore()) => {
  const toastsAtom = atom<
    Array<{
      id: string;
      open: boolean;
      toast: ToastElement;
    }>
  >([]);

  return {
    atom: toastsAtom,

    create: (toast: ToastElement) => {
      const id = genId();
      store.set(toastsAtom, [
        ...store.get(toastsAtom),
        { id, open: true, toast },
      ]);

      return id;
    },

    remove: (id: string) => {
      store.set(
        toastsAtom,
        store
          .get(toastsAtom)
          .map((item) => (item.id === id ? { ...item, open: false } : item)),
      );
      setTimeout(
        () =>
          store.set(
            toastsAtom,
            store.get(toastsAtom).filter((item) => item.id !== id),
          ),
        200,
      );
    },
  };
};
