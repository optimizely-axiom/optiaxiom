"use client";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  theme,
} from "@optiaxiom/react";
import ReactSelect from "react-select";

import { MenuPortal } from "./MenuPortal";

const options = [
  { label: "Chocolate", value: "chocolate" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Vanilla", value: "vanilla" },
];

export function App() {
  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>

      <DialogContent>
        <DialogHeader>ModalLayer Demonstration</DialogHeader>
        <DialogBody>
          <ReactSelect
            components={{ MenuPortal }}
            menuPortalTarget={
              typeof document !== "undefined" ? document.body : undefined
            }
            options={options}
            styles={{
              menuPortal: (styles) => ({
                ...styles,
                zIndex: theme.zIndex.popover,
              }),
            }}
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose appearance="primary">Done</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
