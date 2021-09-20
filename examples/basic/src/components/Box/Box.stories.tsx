import { Story, Meta } from '@storybook/react';
import { vars } from 'styles/vars.css';
import { Box, BoxProps } from './Box';

export default {
  title: 'Example/Box',
  component: Box,
  argTypes: {
    background: { control: 'select', options: Object.keys(vars.color) },
    width: { control: 'select', options: Object.keys(vars.widths) },
    height: { control: 'select', options: Object.keys(vars.heights) },
    paddingX: { control: 'select', options: Object.keys(vars.space) },
    paddingY: { control: 'select', options: Object.keys(vars.space) },
  },
} as Meta<BoxProps>;

const Template: Story<BoxProps> = (args) => <Box {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  background: 'coolGray800',
  width: 'modal',
  height: 'modal',
};
