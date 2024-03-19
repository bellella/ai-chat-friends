import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './FriendModal';

const meta = {
  title: 'Page/Friends',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FriendModal: Story = {};
