import { IncrementingButton, IncrementingButtonProps } from "./IncrementingButton";

import { makeStateDecorator } from "../src";
import { Meta, StoryObj } from "@storybook/react";

const stateDecorator = makeStateDecorator<IncrementingButtonProps>("onClick", "label");

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  component: IncrementingButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [stateDecorator],
} satisfies Meta<IncrementingButtonProps>;

type Story = StoryObj<IncrementingButtonProps>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 1,
  },
};
