import type { Meta, StoryObj } from "@storybook/react";

import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@optiaxiom/react";

const meta: Meta<typeof Slider> = {
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Primary: Story = {
  render: () => (
    <Slider defaultValue={[50]} max={100} step={1}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb aria-label="Volume" />
    </Slider>
  ),
};
