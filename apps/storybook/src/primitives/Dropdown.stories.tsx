import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@optiaxiom/react";

const meta: Meta<typeof DropdownContent> = {
  component: DropdownContent,
};

export default meta;

type Story = StoryObj<typeof DropdownContent>;

export const Basic: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button>Press</Button>
      </DropdownTrigger>

      <DropdownContent>
        <DropdownItem>New Tab</DropdownItem>
        <DropdownItem>New Window</DropdownItem>
        <DropdownItem>New Private Window</DropdownItem>
        {/* <DropdownSeparator /> */}
        {/* <DropdownArrow /> */}
      </DropdownContent>
      {/* </DropdownPortal> */}
    </Dropdown>
  ),
};
