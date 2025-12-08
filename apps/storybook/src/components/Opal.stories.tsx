import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Alert,
  Avatar,
  Button,
  Group,
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
    <Group flexDirection="column" gap="16">
      <Alert intent="opal" onDismiss={() => {}}>
        <Group gap="16" justifyContent="space-between">
          <Text>A brief line or two describing the alert information.</Text>
          <Link external href="data:,">
            Link text
          </Link>
        </Group>
      </Alert>
      <Alert intent="opal" onDismiss={() => {}}>
        <Group gap="16" justifyContent="space-between">
          <Text>A brief line or two describing the alert information.</Text>
          <Button appearance="primary-opal" size="sm">
            Button
          </Button>
        </Group>
      </Alert>
    </Group>
  ),
};

export const AvatarExample: Story = {
  name: "Avatar",
  render: () => (
    <Group gap="16">
      {(["md", "sm", "xs", "2xs"] as const).map((size) => (
        <Avatar fallback="opal" key={size} size={size} />
      ))}
    </Group>
  ),
};

export const ButtonExample: Story = {
  name: "Button",
  render: () => (
    <Group flexDirection="column" gap="16">
      {(["primary-opal", "default-opal"] as const).map((appearance) =>
        ([false, true] as const).map((disabled) => (
          <Group
            flexDirection="column"
            gap="16"
            key={`${appearance}-${disabled}`}
          >
            <Group gap="16">
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
            </Group>
            <Group gap="16">
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
            </Group>
            <Group gap="16">
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
            </Group>
          </Group>
        )),
      )}
    </Group>
  ),
};

export const ProgressExample: Story = {
  name: "Progress",
  render: () => (
    <Group flexDirection="column" gap="16" w="384">
      <Progress aria-label="Label" intent="opal" value={20} />
      <Progress aria-label="Label" intent="opal" value={100} />
    </Group>
  ),
};
