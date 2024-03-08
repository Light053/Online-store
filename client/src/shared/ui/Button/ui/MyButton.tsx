import { FC, PropsWithChildren, ButtonHTMLAttributes } from "react";
import { classNames } from "shared/lib/class-names/class-names";
import styles from './MyButton.module.scss';

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
	className?: string;
}

export const MyButton: FC<ButtonProps> = ({ className, children, ...otherProps }) => {
	return (
		<button className={classNames(styles.MyButton, {}, [className])} {...otherProps}>
			{children}
		</button>
	);
};
