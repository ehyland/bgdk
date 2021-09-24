import * as styles from './Logo.css';
import { logoSvg } from 'assets';

export type LogoProps = {};

export const Logo = (props: LogoProps) => <img className={styles.image} src={logoSvg} alt="logo" />;
