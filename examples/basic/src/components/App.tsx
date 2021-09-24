import * as styles from './App.css';
import { Box } from './Box';
import { Logo } from './Logo';
import { InlineCode } from './InlineCode';
import { Link } from './Link';

export const App = () => (
  <Box textAlign="center">
    <header className={styles.header}>
      <Logo />
      <p>
        Edit <InlineCode>src/components/App.tsx</InlineCode> and save to reload.
      </p>
      <Link href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </Link>
    </header>
  </Box>
);
