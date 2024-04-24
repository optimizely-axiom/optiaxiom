import type { Meta, StoryObj } from "@storybook/react";

import { Grid, Paper, Skeleton, Stack } from "@optiaxiom/react";

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: "Components / Skeleton",
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Primary: Story = {};

export const Card: Story = {
  render: () => (
    <Paper
      className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto"
      maxWidth="sm"
      padding="md"
    >
      <Stack align="start" direction="horizontal">
        <Skeleton borderRadius="full" size={6} />

        <Stack flex={1} paddingY={0.5}>
          <Skeleton height={1.5} />

          <Stack marginTop="md">
            <Grid className="grid grid-cols-3 gap-4" cols={3}>
              <Skeleton colSpan={2} height={1.5} />
              <Skeleton colSpan={1} height={1.5} />
            </Grid>

            <Skeleton height={1.5} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  ),
};
