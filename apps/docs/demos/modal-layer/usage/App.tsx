import { theme } from "@optiaxiom/globals";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>ModalLayer Demonstration</DialogTitle>
        </DialogHeader>
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
