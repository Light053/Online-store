import { FC } from "react";
import styles from './NavBar.module.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { RouterPath } from "shared/config/route-config/route-config";
import { Button } from "react-bootstrap";
import { StateSchema } from "app/providers/store-providers/config/state-schema";
import { connect } from "react-redux";
import { setAuths } from "features/actionCreators/actions";

interface NavBarProps {
	className?: string;
	isAuth: boolean; // Принимаем isAuth из Redux Store
	setIsAuth: (value: boolean) => void; // Принимаем setIsAuth, функцию для обновления isAuth
}

const NavBar: FC<NavBarProps> = ({ isAuth, setIsAuth }) => {

	console.log(isAuth);


	return (
		<Navbar className={styles.Navbar}>
			<Container >
				<NavLink className={styles.brand} to={RouterPath.main}>BuyDevice</NavLink>
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
							variant={"outline-light"}
							onClick={() => setIsAuth(!isAuth)}

						>
							Exit
						</Button>
					</Nav>
					:
					<Nav className="ml-auto">
						<Button
							className={styles.link}
							variant={"outline-light"}
							onClick={() => setIsAuth(!isAuth)}>
							Authorization
						</Button>
					</Nav>
				}
			</Container>
		</Navbar>
	);
};

const mapStateToProps = (state: StateSchema) => ({
	isAuth: state.user.isAuth
});

const mapDispatchToProps = {
	setIsAuth: (value: boolean) => setAuths(value)
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
