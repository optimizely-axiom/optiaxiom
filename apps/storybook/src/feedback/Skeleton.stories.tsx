import type { Meta, StoryObj } from "@storybook/react";

import { Box, Flex, Grid, Skeleton } from "@optiaxiom/react";
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
    <Box bg="surface" p="md" rounded="sm" shadow="sm" w="384">
      <Flex alignItems="start" flexDirection="row">
        <Skeleton rounded="full" size="48" />

        <Flex flex="1" py="4">
          <Skeleton h="12" />

          <Flex mt="md">
            <Grid cols="3">
              <Skeleton colSpan="2" h="12" />
              <Skeleton colSpan="1" h="12" />
            </Grid>

            <Skeleton h="12" />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  ),
};

export const Children: Story = {
  args: {
    children: <IconUserFilled />,
    color: "white",
    p: "xs",
    rounded: "full",
    size: "48",
  },
};
