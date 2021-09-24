import { atoms } from 'styles/atoms.css';
import { createBox } from 'dessert-box';

export type BoxProps = Parameters<typeof atoms>[0];

export const Box = createBox({ atoms });
