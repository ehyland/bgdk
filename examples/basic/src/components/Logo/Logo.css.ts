import { keyframes, style } from '@vanilla-extract/css';

const rotate = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const image = style({
  height: '40vmin',
  pointerEvents: 'none',
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${rotate} infinite 20s linear`,
    },
  },
});
