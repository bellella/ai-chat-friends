import type { Meta, StoryObj } from '@storybook/react';

import { FormPage } from './chat';

const meta = {
  title: 'Page/Chat',
  component: FormPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FormPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chat: Story = {};
