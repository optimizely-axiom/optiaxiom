import figma from "@figma/code-connect";
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogForm,
  DialogHeader,
  DialogTrigger,
} from "@optiaxiom/react";

figma.connect(
  Dialog,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=5324:11893",
  {
    example: ({ children }) => (
      <Dialog>
        <DialogTrigger>Example</DialogTrigger>

        {children}
      </Dialog>
    ),
    props: {
      children: figma.children("Dialog Body"),
    },
  },
);

figma.connect(
  DialogContent,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=833:46549",
  {
    example: ({ body, header, size }) => (
      <DialogContent size={size}>
        <DialogHeader>{header.title}</DialogHeader>

        {body}
      </DialogContent>
    ),
    props: {
      body: figma.children("◇ Dialog content"),
      header: figma.nestedProps("◇ Dialog header", {
        description: figma.boolean("Show description", {
          false: undefined,
          true: figma.string("↳ Dialog description"),
        }),
        title: figma.string("Dialog title"),
      }),
      size: figma.enum("Size", {
        Lg: "lg",
        Md: undefined,
        Sm: "sm",
      }),
    },
  },
);

figma.connect(
  DialogBody,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=833:46411",
  {
    example: ({ children }) => (
      <DialogForm
        onSubmit={() => {
          /* handle form submission */
        }}
      >
        <DialogBody>{children}</DialogBody>

        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button appearance="primary" type="submit">
            Confirm
          </Button>
        </DialogFooter>
      </DialogForm>
    ),
    props: {
      children: figma.children("*"),
    },
    variant: { Variant: "Inputs" },
  },
);

figma.connect(
  DialogBody,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=833:46411",
  {
    example: ({ children }) => (
      <>
        <DialogBody>{children}</DialogBody>

        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button appearance="primary" type="submit">
            Confirm
          </Button>
        </DialogFooter>
      </>
    ),
    props: {
      children: figma.string("Paragraph text"),
    },
    variant: { Variant: "Paragraph" },
  },
);
