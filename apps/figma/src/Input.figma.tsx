import figma from "@figma/code-connect";
import { Field, Input } from "@optiaxiom/react";

figma.connect(
  Input,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=20%3A2741",
  {
    example: ({
      addonBefore,
      appearance,
      description,
      error,
      label,
      placeholder,
      size = "md",
      value,
    }) => (
      <Field
        description={description.text}
        error={error.text}
        info={label.info}
        label={label.label}
        required={label.required}
      >
        <Input
          addonBefore={addonBefore}
          appearance={appearance}
          placeholder={placeholder}
          size={size}
          value={value}
        />
      </Field>
    ),
    props: {
      addonAfter: figma.boolean("End icon"),
      addonBefore: figma.boolean("Calendar Icon", {
        false: undefined,
        true: figma.children("IconCalendar"),
      }),
      appearance: figma.enum("Variant", {
        Number: "number",
        "Number Placeholder": "number",
        Text: undefined,
        "Text Placeholder": undefined,
      }),
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
        Number: undefined,
        "Number Placeholder": figma.string("Placeholder"),
        Text: undefined,
        "Text Placeholder": figma.string("Placeholder"),
      }),
      size: figma.enum("Size", {
        "Large - 40": "lg",
        "Medium - 32": "md",
      }),
      value: figma.enum("Variant", {
        Number: figma.string("Number"),
        "Number Placeholder": undefined,
        Text: figma.string("Text"),
        "Text Placeholder": undefined,
      }),
    },
  },
);
