import { FC } from "react";
import styles from './NavBar.module.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { RouterPath } from "shared/config/route-config/route-config";
import { Button } from "react-bootstrap";
import { useAppSelector } from "features/hooks/useAppSelector";
import { logout } from "entities/user/model/actionCreators";
import { useAppDispatch } from "features/hooks/useAppDispatch";
import { MyButton } from "shared/ui/Button";
import Basket from 'shared/assets/Basket.svg'
import { classNames } from "shared/lib/class-names/class-names";

interface NavBarProps {
	className?: string;
}

const NavBar: FC<NavBarProps> = ({ className }) => {
	const isAuth = useAppSelector(state => state.user.isAuth);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const checkAuth = () => {
		if (isAuth) {
			navigate('/');
		}
	}

	const handleLogout = () => {
		dispatch(logout())
		navigate(RouterPath.authorization)
	}

	const handleAdminPanel = () => {
		navigate(RouterPath.admin)
	}

	const handleAuth = () => {
		navigate(RouterPath.authorization)
	}

	const handleBasket = () => {
		navigate(RouterPath.basket)
	}

	console.log(isAuth);

	return (
		<Navbar className={styles.Navbar}>
			<Container>
				<Button variant="outline-dark" className={styles.brand} onClick={checkAuth}>BuyDevice</Button>
				{isAuth ?
					<Nav className="ml-auto">
						<MyButton
							className={styles.link}
							onClick={handleAdminPanel}
						>
							Admin Panel
						</MyButton>
						<MyButton
							className={styles.link}
							onClick={handleLogout}
						>
							Exit
						</MyButton>
						<MyButton
							className={classNames(styles.basket, {}, [])}
							onClick={handleBasket}
						>
							<Basket width={30} height={30} />
						</MyButton>
					</Nav>
					:
					<Nav className="ml-auto">
						<MyButton
							className={styles.link}
							onClick={handleAuth}
						>
							Authorization
						</MyButton>
					</Nav>
				}
			</Container>
		</Navbar>
	);
};


export default NavBar;
