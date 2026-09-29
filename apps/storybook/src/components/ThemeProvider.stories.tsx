import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Badge,
  Button,
  Checkbox,
  Field,
  Group,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectContent,
  SelectTrigger,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  ThemeProvider,
} from "@optiaxiom/react";
import { Range } from "@optiaxiom/react/unstable";
import { useEffect, useState } from "react";

type StoryArgs = {
  /**
   * The host page's `html { font-size }`.
   */
  rootFontSize: "10px" | "16px" | "20px";
  /**
   * Value of `--ax-styles-scale` on `:root`; unset follows the root font size.
   */
  stylesScale: "16px" | "max(1rem, 16px)" | "unset";
};

const TrafficPanel = () => {
  const [exploit, setExploit] = useState(90);

  return (
    <Group
      bg="bg.default"
      border="1"
      borderColor="border.secondary"
      flexDirection="column"
      gap="16"
      p="24"
      rounded="lg"
      w="384"
    >
      <Group flexDirection="column" gap="4">
        <Heading level="4">Campaign Configuration</Heading>
        <Text color="fg.secondary" fontSize="sm">
          Configure campaign-level settings
        </Text>
      </Group>

      <Tabs defaultValue="traffic">
        <TabsList>
          <TabsTrigger value="activation">Activation</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger
            addonAfter={
              <Badge intent="primary" variant="strong">
                2
              </Badge>
            }
            value="metrics"
          >
            Metrics
          </TabsTrigger>
        </TabsList>
        <TabsContent pt="16" value="activation">
          Activation settings
        </TabsContent>
        <TabsContent value="traffic">
          <Group flexDirection="column" gap="16" pt="16">
            <Field label="Traffic allocation policy">
              <Select
                defaultValue="bandit"
                options={[
                  { label: "Manual", value: "manual" },
                  { label: "Contextual Bandit", value: "bandit" },
                ]}
              >
                <SelectTrigger />
                <SelectContent />
              </Select>
            </Field>

            <Group alignItems="center" gap="16">
              <Group alignItems="center" gap="4">
                <Input
                  appearance="number"
                  aria-label="Explore"
                  onChange={(event) =>
                    setExploit(100 - Number(event.target.value))
                  }
                  type="number"
                  value={100 - exploit}
                  w="64"
                />
                <Text color="fg.secondary" fontSize="sm">
                  %
                </Text>
              </Group>
              <Range
                aria-label="Exploit"
                flex="1"
                onValueChange={setExploit}
                value={exploit}
              />
              <Group alignItems="center" gap="4">
                <Input
                  appearance="number"
                  aria-label="Exploit"
                  onChange={(event) => setExploit(Number(event.target.value))}
                  type="number"
                  value={exploit}
                  w="64"
                />
                <Text color="fg.secondary" fontSize="sm">
                  %
                </Text>
              </Group>
            </Group>

            <RadioGroup defaultValue="all" flexDirection="row">
              <Radio value="all">All visitors</Radio>
              <Radio value="new">New visitors</Radio>
            </RadioGroup>

            <Group gap="16">
              <Checkbox defaultChecked>Stats accelerator</Checkbox>
              <Switch defaultChecked>Holdback</Switch>
            </Group>

            <Field label="Notes">
              <Textarea
                defaultValue={"Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6"}
                maxRows={3}
              />
            </Field>
          </Group>
        </TabsContent>
        <TabsContent pt="16" value="metrics">
          Metrics settings
        </TabsContent>
      </Tabs>

      <Group gap="8" justifyContent="end">
        <Button>Revert</Button>
        <Button appearance="primary">Save</Button>
      </Group>
    </Group>
  );
};

export default {
  args: {
    rootFontSize: "16px",
    stylesScale: "unset",
  },
  argTypes: {
    rootFontSize: {
      control: "inline-radio",
      options: ["10px", "16px", "20px"],
    },
    stylesScale: {
      control: "inline-radio",
      options: ["unset", "16px", "max(1rem, 16px)"],
    },
  },
  component: ThemeProvider,
  render: function Render({ rootFontSize, stylesScale }) {
    useEffect(() => {
      const root = document.documentElement;
      root.style.fontSize = rootFontSize;
      if (stylesScale === "unset") {
        root.style.removeProperty("--ax-styles-scale");
      } else {
        root.style.setProperty("--ax-styles-scale", stylesScale);
      }
      return () => {
        root.style.removeProperty("font-size");
        root.style.removeProperty("--ax-styles-scale");
      };
    }, [rootFontSize, stylesScale]);

    return <TrafficPanel />;
  },
} as Meta<StoryArgs>;

type Story = StoryObj<StoryArgs>;

export const Basic: Story = {};

export const SmallRootFontSize: Story = {
  args: {
    rootFontSize: "10px",
  },
};

export const LargeRootFontSize: Story = {
  args: {
    rootFontSize: "20px",
  },
};

export const StylesScale: Story = {
  args: {
    rootFontSize: "10px",
    stylesScale: "max(1rem, 16px)",
  },
};
