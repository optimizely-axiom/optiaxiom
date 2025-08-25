import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Alert,
  Avatar,
  Button,
  Flex,
  Link,
  Progress,
  Text,
} from "@optiaxiom/react";
import { IconMicrophone } from "@tabler/icons-react";

export default {
  component: Button,
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    appearance: "primary-opal",
    children: "Button",
  },
};

export const AlertExample: Story = {
  name: "Alert",
  render: () => (
    <Flex>
      <Alert intent="opal" onDismiss={() => {}}>
        <Flex flexDirection="row" justifyContent="space-between">
          <Text>A brief line or two describing the alert information.</Text>
          <Link external href="data:,">
            Link text
          </Link>
        </Flex>
      </Alert>
      <Alert intent="opal" onDismiss={() => {}}>
        <Flex flexDirection="row" justifyContent="space-between">
          <Text>A brief line or two describing the alert information.</Text>
          <Button appearance="primary-opal" size="sm">
            Button
          </Button>
        </Flex>
      </Alert>
    </Flex>
  ),
};

export const AvatarExample: Story = {
  name: "Avatar",
  render: () => (
    <Flex flexDirection="row">
      {(["md", "sm", "xs", "2xs"] as const).map((size) => (
        <Avatar fallback="opal" key={size} size={size} />
      ))}
    </Flex>
  ),
};

export const ButtonExample: Story = {
  name: "Button",
  render: () => (
    <Flex>
      {(["primary-opal", "default-opal"] as const).map((appearance) =>
        ([false, true] as const).map((disabled) => (
          <Flex key={`${appearance}-${disabled}`}>
            <Flex flexDirection="row">
              {(["lg", "md", "sm"] as const).map((size) => (
                <Button
                  appearance={appearance}
                  disabled={disabled}
                  key={size}
                  size={size}
                >
                  Button
                </Button>
              ))}
            </Flex>
            <Flex flexDirection="row">
              {(["lg", "md", "sm"] as const).map((size) => (
                <Button
                  appearance={appearance}
                  disabled={disabled}
                  key={size}
                  loading
                  size={size}
                >
                  Button
                </Button>
              ))}
            </Flex>
            <Flex flexDirection="row">
              {(["lg", "md", "sm"] as const).map((size) => (
                <Button
                  appearance={appearance}
                  aria-label="Submit"
                  disabled={disabled}
                  icon={<IconMicrophone />}
                  key={size}
                  size={size}
                />
              ))}
            </Flex>
          </Flex>
        )),
      )}
    </Flex>
  ),
};

export const ProgressExample: Story = {
  name: "Progress",
  render: () => (
    <Flex w="384">
      <Progress aria-label="Label" intent="opal" value={20} />
      <Progress aria-label="Label" intent="opal" value={100} />
    </Flex>
  ),
};
