import type { Meta, StoryObj } from "@storybook/react";

import { Grid, Paper, Skeleton, Stack } from "@optiaxiom/react";
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
    <Paper maxWidth="sm" p="md">
      <Stack alignItems="start" flexDirection="horizontal">
        <Skeleton rounded="full" size="48" />

        <Stack flex="1" py="4">
          <Skeleton h="12" />

          <Stack mt="md">
            <Grid cols="3">
              <Skeleton colSpan="2" h="12" />
              <Skeleton colSpan="1" h="12" />
            </Grid>

            <Skeleton h="12" />
          </Stack>
        </Stack>
      </Stack>
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
