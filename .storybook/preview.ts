import type { Preview } from '@storybook/react';

// DatePicker stylesheets
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
} satisfies Preview;

export default preview;
