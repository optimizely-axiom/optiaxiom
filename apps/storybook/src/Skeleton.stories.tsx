import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Grid, Paper, Skeleton } from "@optiaxiom/react";
import { IconUserFilled } from "@tabler/icons-react";

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: "Feedback / Skeleton",
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Primary: Story = {};

export const Card: Story = {
  render: () => (
    <Paper maxW="sm" p="md">
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
    </Paper>
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
