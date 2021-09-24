import { style } from '@vanilla-extract/css';
import { atoms } from 'styles/atoms.css';

export const header = style([
  atoms({
    color: 'white',
    background: 'coolGray800',
  }),
  style({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  }),
]);
