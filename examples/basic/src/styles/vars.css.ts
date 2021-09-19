import { createGlobalTheme } from '@vanilla-extract/css';
import * as colors from './colors';

export const vars = createGlobalTheme(':root', {
  space: {
    x0: '0px',
    x1: '4px',
    x2: '8px',
    x3: '12px',
    x4: '16px',
    x5: '20px',
    x6: '24px',
    x7: '28px',
    x8: '32px',
  },
  widths: {
    none: '0',
    xs: '100px',
    sm: '200px',
    md: '300px',
    lg: '400px',
    xl: '700px',
    screen: '100vw',
    modal: '75vh',
  },
  heights: {
    none: '0',
    screen: '100vh',
    modal: '75vh',
  },
  color: colors,
  borderRadius: {
    x0: '4px',
    x1: '6px',
    x2: '9px',
    x3: '14px',
    x4: '20px',
    x5: '30px',
    full: '99999px',
  },
  fontFamily: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    code: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  fontSize: {
    x0: '16px',
    x1: '20px',
    x2: '27px',
    x3: '35px',
    x4: '46px',
    x5: '60px',
  },
  lineHeight: {
    x0: '24px',
    x1: '30px',
    x2: '38px',
    x3: '47px',
    x4: '59px',
    x5: '73px',
  },
});
