import { style, composeStyles } from '@vanilla-extract/css';
import { atoms } from 'styles/atoms.css';

export const code = composeStyles(
  atoms({
    fontFamily: 'code',
  }),
  style({})
);
