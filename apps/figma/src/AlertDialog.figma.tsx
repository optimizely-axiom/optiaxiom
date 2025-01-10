import figma from "@figma/code-connect";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@optiaxiom/react";

figma.connect(
  AlertDialog,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=5640:38835",
  {
    example: ({ body, size, title }) => (
      <AlertDialog>
        <AlertDialogTrigger>Example</AlertDialogTrigger>

        <AlertDialogContent size={size}>
          <AlertDialogHeader>{title.children}</AlertDialogHeader>

          <AlertDialogBody>{body.children}</AlertDialogBody>

          <AlertDialogFooter>
            <AlertDialogCancel />
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    props: {
      body: figma.nestedProps("Body", {
        children: figma.string("Body text"),
      }),
      size: figma.enum("Size", {
        sm: "sm",
        md: undefined,
        lg: "lg",
      }),
      title: figma.nestedProps("Header", {
        children: figma.string("Title"),
      }),
    },
  },
);
