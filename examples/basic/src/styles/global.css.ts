import { globalStyle } from '@vanilla-extract/css';
import { normalize } from 'polished';
import { vars } from './vars.css';

// Add normalize.css
normalize().forEach((rules) => {
  Object.entries(rules).forEach(([selector, styles]) => {
    globalStyle(selector, styles as any);
  });
});

globalStyle('body', {
  fontFamily: vars.fontFamily.body,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

// global box-sizing fix
globalStyle('html', {
  boxSizing: 'border-box',
});

globalStyle('*, *:before, *:after', {
  boxSizing: 'inherit',
});
