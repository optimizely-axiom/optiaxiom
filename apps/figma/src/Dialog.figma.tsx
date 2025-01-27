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
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=5324:11893",
  {
    example: ({ content, header }) => (
      <Dialog>
        <DialogTrigger>Example</DialogTrigger>

        <DialogContent size={content.size}>
          <DialogHeader>{header.title}</DialogHeader>

          {content.body}
        </DialogContent>
      </Dialog>
    ),
    props: {
      content: figma.nestedProps("Dialog Body", {
        body: figma.children("◇ Dialog content"),
        size: figma.enum("Size", {
          Lg: "lg",
          Md: undefined,
          Sm: "sm",
        }),
      }),
      header: figma.nestedProps("◇ Dialog header", {
        description: figma.boolean("Show description", {
          false: undefined,
          true: figma.string("↳ Dialog description"),
        }),
        title: figma.string("Dialog title"),
      }),
    },
  },
);

figma.connect(
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
