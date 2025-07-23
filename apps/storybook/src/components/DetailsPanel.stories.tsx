import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Flex } from "@optiaxiom/react";
import {
  DetailsPanel,
  DetailsPanelBody,
  DetailsPanelFooter,
  DetailsPanelHeader,
} from "@optiaxiom/react/unstable";
import { IconX } from "@tabler/icons-react";

export default {
  args: {
    w: "384",
  },
  component: DetailsPanel,
  decorators: (Story) => (
    <Flex
      alignItems="end"
      bg="bg.page"
      p="24"
      style={{
        height: "80vh",
        width: "600px",
      }}
    >
      <Story />
    </Flex>
  ),
} as Meta<typeof DetailsPanel>;

type Story = StoryObj<typeof DetailsPanel>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <DetailsPanelHeader
          addonAfter={
            <Button appearance="subtle" aria-label="Close" icon={<IconX />} />
          }
          description="Original Image (Oct 23, 2024)"
        >
          Header Contents
        </DetailsPanelHeader>
        <DetailsPanelBody>Body Contents</DetailsPanelBody>
        <DetailsPanelFooter>
          <Button appearance="primary">Create Task</Button>
        </DetailsPanelFooter>
      </>
    ),
  },
};
