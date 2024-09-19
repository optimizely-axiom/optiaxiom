import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Link, Text } from "@optiaxiom/react";
import {
  Banner,
  BannerDescription,
  BannerTitle,
} from "@optiaxiom/react/unstable";
import { action } from "@storybook/addon-actions";

export default {
  component: BannerDescription,
} as Meta<typeof Banner>;

type Story = StoryObj<typeof Banner>;

export const Basic: Story = {
  args: {
    children: (
      <BannerDescription>You can update your email only once</BannerDescription>
    ),
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
      <Banner variant="light" {...args} />
      <Banner variant="solid" {...args} />
    </Flex>
  ),
};

export const Solid: Story = {
  args: {
    children: (
      <BannerDescription>This is a site wide banner message</BannerDescription>
    ),
    variant: "solid",
  },
  render: (args) => (
    <Flex>
      <Banner colorScheme="note" {...args} />
      <Banner colorScheme="info" {...args} />
      <Banner colorScheme="warning" {...args} />
      <Banner colorScheme="danger" {...args} />
      <Banner colorScheme="success" {...args} />
    </Flex>
  ),
};

export const Light: Story = {
  args: {
    children: (
      <BannerDescription>This is an inline section message</BannerDescription>
    ),
    variant: "light",
  },
  render: (args) => (
    <Flex>
      <Banner colorScheme="note" {...args} />
      <Banner colorScheme="info" {...args} />
      <Banner colorScheme="warning" {...args} />
      <Banner colorScheme="danger" {...args} />
      <Banner colorScheme="success" {...args} />
    </Flex>
  ),
};

export const BannerExample: Story = {
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
    colorScheme: "danger",
    onClose: () => {},
    variant: "solid",
  },
  parameters: {
    layout: "padded",
  },
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
