import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box, Grid, Group, Skeleton } from "@optiaxiom/react";
import { IconUserFilled } from "@tabler/icons-react";

export default {
  component: Skeleton,
} as Meta<typeof Skeleton>;

type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  args: {
    w: "384",
  },
};

export const Card: Story = {
  render: () => (
    <Box bg="bg.default" p="16" rounded="sm" shadow="sm" w="384">
      <Group alignItems="start" gap="16">
        <Skeleton rounded="full" size="xl" />

        <Group flex="1" flexDirection="column" gap="16" py="4">
          <Skeleton h="12" />

          <Group flexDirection="column" gap="16" mt="16">
            <Grid gridTemplateColumns="3">
              <Skeleton gridColumn="2" h="12" />
              <Skeleton gridColumn="1" h="12" />
            </Grid>

            <Skeleton h="12" />
          </Group>
        </Group>
      </Group>
    </Box>
  ),
};

export const Children: Story = {
  args: {
    children: <IconUserFilled size="20" />,
    color: "fg.default.inverse",
    p: "8",
    rounded: "full",
    size: "xl",
  },
};
