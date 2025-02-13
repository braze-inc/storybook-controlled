import { DateRangePicker } from "react-date-range";

import { controlledDecorator } from "../src";
import { Meta, StoryObj } from "@storybook/react";

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

type DateRangePickerProps = {
  onChange: (ranges: { selection: DateRange }) => void;
  ranges: DateRange[];
};

const stateDecorator = controlledDecorator<DateRangePickerProps>(
  "onChange",
  ({ selection }) => ({ ranges: [selection] })
);

export default {
  component: DateRangePicker,
  parameters: {
    layout: "centered",
  },
  args: {
    ranges: [
      {
        startDate: new Date(1714383846000),
        endDate: new Date(1714483846000),
        key: "selection",
      },
    ],
    showSelectionPreview: true,
    moveRangeOnFirstSelection: false,
    months: 2,
    direction: "horizontal",
  },
  decorators: [stateDecorator],
} satisfies Meta<DateRangePicker>;

type Story = StoryObj<DateRangePicker>;

/**
 * This DateRangePicker has a more complex callback that requires unpacking to be fed back into state.
 * To accomodate these use cases, the propSetter can be a function that returns an object to be merged with the props.
 */
export const Primary: Story = {
  parameters: {
    docs: {
      source: {
        code: `
const stateDecorator = controlledDecorator<DateRangePickerProps>(
  "onChange",
  ({selection}) => ({ranges: [selection]})
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
