import * as styles from './InlineCode.css';
import { ReactNode } from 'react';

export type InlineCodeProps = {
  children?: ReactNode;
};

export const InlineCode = ({ children }: InlineCodeProps) => (
  <code className={styles.code}>{children}</code>
);
