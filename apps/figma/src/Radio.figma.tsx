import figma from "@figma/code-connect";
import { Field, Radio, RadioGroup } from "@optiaxiom/react";

figma.connect(
  Radio,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=173:647",
  {
    example: ({ children, ...props }) => (
      <Radio value="foo" {...props}>
        {children}
      </Radio>
    ),
    props: {
      children: figma.string("Label"),
      description: figma.boolean("Helper Text", {
        false: undefined,
        true: figma.string("↳ Helper text"),
      }),
    },
  },
);

figma.connect(
  RadioGroup,
  "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=4790:78962",
  {
    example: ({ children, label }) => (
      <Field
        description={label.description}
        label={label.label}
        required={label.required}
      >
        <RadioGroup name="sample" value="bar">
          {children}
        </RadioGroup>
      </Field>
    ),
    props: {
      children: figma.children("Radio"),
      label: figma.nestedProps("Label", {
        description: figma.enum("Appearance", {
          Default: undefined,
          "With description": "Add description",
        }),
        label: figma.string("Label text"),
        required: figma.boolean("IsRequired"),
      }),
    },
  },
);
