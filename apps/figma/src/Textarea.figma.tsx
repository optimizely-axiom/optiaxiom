import figma from "@figma/code-connect";
import { Field, Textarea } from "@optiaxiom/react";

figma.connect(
  Textarea,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=679:6927",
  {
    example: ({ description, error, label, placeholder, resize, value }) => (
      <Field
        description={description.text}
        error={error.text}
        info={label.info}
        label={label.label}
        required={label.required}
      >
        <Textarea placeholder={placeholder} resize={resize} value={value} />
      </Field>
    ),
    props: {
      description: figma.boolean("Show Note", {
        false: { text: undefined },
        true: figma.nestedProps("Form note", {
          text: figma.enum("State", {
            Default: "Form note",
          }),
        }),
      }),
      error: figma.boolean("Show Note", {
        false: { text: undefined },
        true: figma.nestedProps("Form note", {
          text: figma.enum("State", {
            Error: figma.string("Form note"),
          }),
        }),
      }),
      label: figma.boolean("Show Label", {
        false: {
          info: undefined,
          label: undefined,
          required: undefined,
        },
        true: figma.nestedProps("Label", {
          info: figma.boolean("Contextual help", {
            false: undefined,
            true: "More contextual information",
          }),
          label: figma.string("Label text"),
          required: figma.boolean("IsRequired"),
        }),
      }),
      placeholder: figma.enum("Variant", {
        Text: undefined,
        "Text Placeholder": figma.string("Placeholder"),
      }),
      resize: figma.boolean("Show knob", {
        false: undefined,
        true: "vertical",
      }),
      value: figma.enum("Variant", {
        Text: figma.string("Text"),
        "Text Placeholder": undefined,
      }),
    },
  },
);
