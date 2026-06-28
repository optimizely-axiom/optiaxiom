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
              control: (styles) => ({
                ...styles,
                backgroundColor: theme.colors["bg.default"],
                borderColor: theme.colors["border.default"],
              }),
              input: (styles) => ({
                ...styles,
                color: theme.colors["fg.default"],
              }),
              menu: (styles) => ({
                ...styles,
                backgroundColor: theme.colors["bg.default"],
              }),
              menuPortal: (styles) => ({
                ...styles,
                zIndex: theme.zIndex.popover,
              }),
              option: (styles, state) => ({
                ...styles,
                backgroundColor: state.isFocused
                  ? theme.colors["bg.default.hovered"]
                  : "transparent",
                color: theme.colors["fg.default"],
              }),
              placeholder: (styles) => ({
                ...styles,
                color: theme.colors["fg.tertiary"],
              }),
              singleValue: (styles) => ({
                ...styles,
                color: theme.colors["fg.default"],
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
