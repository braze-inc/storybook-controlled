import {
  IncrementingButton,
  IncrementingButtonProps,
} from "./IncrementingButton";

import { controlledDecorator } from "../src";
import { Meta, StoryObj } from "@storybook/react";

const stateDecorator = controlledDecorator<IncrementingButtonProps>(
  "onClick",
  "label"
);

export default {
  component: IncrementingButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    primary: true,
    label: 1,
  },
  decorators: [stateDecorator],
} satisfies Meta<IncrementingButtonProps>;

type Story = StoryObj<IncrementingButtonProps>;

/**
 * This is a simple button that increments a number when clicked.
 * You'll notice that the args change when you click the button.
 * You'll also notice that clicking the button also generates an action.
 */
export const Primary: Story = {
  parameters: {
    docs: {
      source: {
        code: `
const stateDecorator = controlledDecorator<IncrementingButtonProps>(
  "onClick",
  "label"
);

export default {
  decorators: [stateDecorator],
  ...
}
`,
        type: "code",
      },
    },
  },
};
