import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { atom, getDefaultStore } from "jotai";

import type { Toast } from "../toast/Toast";

type ToastElement = ReactElement<ComponentPropsWithoutRef<typeof Toast>>;

let id = 1;
const genId = () => {
  return "t" + id++;
};

export const createToaster = (store = getDefaultStore()) => {
  const toastsAtom = atom<
    Array<{
      id: string;
      toast: ToastElement;
    }>
  >([]);

  return {
    atom: toastsAtom,

    create: (toast: ToastElement) => {
      const id = genId();
      store.set(toastsAtom, [...store.get(toastsAtom), { id, toast }]);
      return id;
    },

    remove: (id: string) => {
      store.set(
        toastsAtom,
        store.get(toastsAtom).filter((item) => item.id !== id),
      );
    },
  };
};
