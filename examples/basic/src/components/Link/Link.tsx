import * as styles from './Link.css';
import { ComponentProps } from 'react';

export type LinkProps = ComponentProps<'a'>;

export const Link = (props: LinkProps) => <a {...props} className={styles.anchor} />;
