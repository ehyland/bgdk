import { style, composeStyles } from '@vanilla-extract/css';
import { atoms } from 'styles/atoms.css';

export const anchor = composeStyles(
  atoms({
    color: 'blue200',
  }),
  style({
    /*  */
  })
);
