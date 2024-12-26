import { DoubleInput, DoubleInputProps } from "./DoubleInput";

import { controlledDecorator } from "../src";
import { Meta, StoryObj } from "@storybook/react";

const stateDecorator = controlledDecorator<DoubleInputProps>(
  "onChange",
  ["inputOne", "inputTwo"]
);

export default {
  component: DoubleInput,
  parameters: {
    layout: "centered",
  },
  args: {
    inputOne: "hello",
    inputTwo: "world",
  },
  decorators: [stateDecorator],
} satisfies Meta<DoubleInputProps>;

type Story = StoryObj<DoubleInputProps>;

/**
 * This is a bit contrived, but in this case I have a callback function that returns two values as separate parameters.
 * By passing an array of keys rather than a single key you can map the values to the correct keys.
 */
export const Primary: Story = {
  parameters: {
    docs: {
      source: {
        code: `
  const stateDecorator = controlledDecorator<DoubleInputProps>(
  "onChange",
  ["inputOne", "inputTwo"]
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
