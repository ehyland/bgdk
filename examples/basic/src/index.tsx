import 'styles/global.css';

import { render } from 'react-dom';
import { StrictMode } from 'react';
import { App } from 'components/App';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
