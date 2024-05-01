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
    <Paper maxWidth="sm" padding="md">
      <Stack alignItems="start" flexDirection="horizontal">
        <Skeleton borderRadius="full" size="6" />

        <Stack flex="1" paddingY="0.5">
          <Skeleton height="1.5" />

          <Stack marginTop="md">
            <Grid cols="3">
              <Skeleton colSpan="2" height="1.5" />
              <Skeleton colSpan="1" height="1.5" />
            </Grid>

            <Skeleton height="1.5" />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  ),
};

export const Children: Story = {
  args: {
    borderRadius: "full",
    children: <IconUserFilled />,
    color: "white",
    padding: "xs",
    size: "6",
  },
};
