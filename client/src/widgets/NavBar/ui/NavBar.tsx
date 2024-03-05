import { FC } from "react";
import styles from './NavBar.module.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import { RouterPath } from "shared/config/route-config/route-config";
import { Button } from "react-bootstrap";
import { useAppSelector } from "features/hooks/useAppSelector";
import { logout } from "entities/user/model/actionCreators";
import { useAppDispatch } from "features/hooks/useAppDispatch";


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
		navigate('/authorization')
	}
	console.log(isAuth);

	return (
		<Navbar className={styles.Navbar}>
			<Container>
				<Button variant="outline-dark" className={styles.brand} onClick={checkAuth}>BuyDevice</Button>
				{isAuth ?
					<Nav className="ml-auto">
						<Button
							className={styles.link}
							variant={"outline-light"}
						>
							Admin Panel
						</Button>
						<Button
							className={styles.link}
							onClick={handleLogout}
							variant={"outline-light"}
						>
							Exit
						</Button>
					</Nav>
					:
					<Nav className="ml-auto">
						<NavLink
							className={styles.link}
							to={RouterPath.authorization}
						>
							Authorization
						</NavLink>
					</Nav>
				}
			</Container>
		</Navbar>
	);
};


export default NavBar;
