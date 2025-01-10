import figma from "@figma/code-connect";
import { Field, SearchInput } from "@optiaxiom/react";

figma.connect(
  SearchInput,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=814:36171",
  {
    example: ({ placeholder, size, value }) => (
      <SearchInput placeholder={placeholder} size={size} value={value} />
    ),
    props: {
      placeholder: figma.enum("Variant", {
        Placeholder: figma.string("Placeholder"),
        Text: undefined,
      }),
      size: figma.enum("Size", {
        "Large - 40": "lg",
        "Medium - 32": undefined,
      }),
      value: figma.enum("Variant", {
        Placeholder: undefined,
        Text: figma.string("Value"),
      }),
    },
    variant: { Label: false },
  },
);

figma.connect(
  SearchInput,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=814:36171",
  {
    example: ({ label, placeholder, size, value }) => (
      <Field
        description={label.description}
        label={label.label}
        required={label.required}
      >
        <SearchInput placeholder={placeholder} size={size} value={value} />
      </Field>
    ),
    props: {
      label: figma.nestedProps("Label", {
        description: figma.enum("Appearance", {
          Default: undefined,
          "With description": "Add description",
        }),
        label: figma.string("Label text"),
        required: figma.boolean("IsRequired"),
      }),
      placeholder: figma.enum("Variant", {
        Placeholder: figma.string("Placeholder"),
        Text: undefined,
      }),
      size: figma.enum("Size", {
        "Large - 40": "lg",
        "Medium - 32": undefined,
      }),
      value: figma.enum("Variant", {
        Placeholder: undefined,
        Text: figma.string("Value"),
      }),
    },
    variant: { Label: true },
  },
);
