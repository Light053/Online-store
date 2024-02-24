import { FC, PropsWithChildren } from "react";
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from "shared/lib/class-names/class-names";

import styles from './AppLink.module.scss'

export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps, PropsWithChildren {
	className?: string;
	theme?: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = (props) => {
	const { children, to, className, theme = AppLinkTheme.PRIMARY, ...otherProps } = props

	return (
		<Link to={to}
			className={classNames(styles.AppLink, {}, [styles[theme], className])} {...otherProps}>
			{children}
		</Link>
	);
};