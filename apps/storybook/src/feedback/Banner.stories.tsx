import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Link, Text } from "@optiaxiom/react";
import {
  Banner,
  BannerDescription,
  BannerTitle,
} from "@optiaxiom/react/unstable";
import { action } from "@storybook/addon-actions";

export default {
  component: Banner,
} as Meta<typeof Banner>;

type Story = StoryObj<typeof Banner>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <BannerDescription flexDirection="row">
          <Text flex="1">
            One or more of your social channel access tokens have expired.
          </Text>

          <Text>
            <Link colorScheme="neutral" href="data:,">
              Sync now
            </Link>
          </Text>
        </BannerDescription>
      </>
    ),
    onClose: () => {},
  },
  parameters: {
    layout: "padded",
  },
};

export const WithCloseButton: Story = {
  args: {
    children: (
      <>
        <BannerTitle>Disclaimer</BannerTitle>
        <BannerDescription>
          Changing your email address is an important account management task
          that requires careful consideration.
        </BannerDescription>
      </>
    ),
    onClose: action("close"),
  },
  render: (args) => (
    <Flex>
      <Banner {...args} />
    </Flex>
  ),
};

export const Appearance: Story = {
  args: {
    children: (
      <BannerDescription>This is a site wide banner message</BannerDescription>
    ),
  },
  render: (args) => (
    <Flex>
      <Banner colorScheme="neutral" {...args} />
      <Banner colorScheme="information" {...args} />
      <Banner colorScheme="warning" {...args} />
      <Banner colorScheme="danger" {...args} />
      <Banner colorScheme="success" {...args} />
    </Flex>
  ),
};

export const Links: Story = {
  args: {
    children: (
      <>
        <BannerTitle>With link</BannerTitle>
        <BannerDescription>
          <Text>Please give a correct email address</Text>
          <Text>
            <Link href="data:,">Do an action</Link>
          </Text>
        </BannerDescription>
      </>
    ),
  },
};
