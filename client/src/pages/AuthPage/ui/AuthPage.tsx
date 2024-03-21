import { FC, useEffect, useState } from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from './AuthPage.module.scss';
import { classNames } from "shared/lib/class-names/class-names";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RouterPath } from "shared/config/route-config/route-config";
import { useAppDispatch } from "features/hooks/useAppDispatch";
import { loginUser, registration } from "entities/user/model/actionCreators";
import { useAppSelector } from "features/hooks/useAppSelector";
import { handleErrors } from "shared/lib/handleErrors/handleErrors";

interface AuthPageProps {
	className?: string;
}

export interface Errors {
	username: string;
	password: string;
	validation: string;
}

export const AuthPage: FC<AuthPageProps> = ({ className }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<Errors>({
		username: '',
		password: '',
		validation: ''
	});

	const error = useAppSelector(state => state.user.error);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const location = useLocation();

	const isLogin = location.pathname === RouterPath.authorization;

	const registerUser = async () => {
		const success = await dispatch(registration(username, password));

		if (success) {
			navigate(RouterPath.main);
		} else {
			console.log('error:', error);
		}
	}

	const login = async () => {
		const success = await dispatch(loginUser(username, password));

		if (success) {
			navigate(RouterPath.main);
		} else {
			console.log('error:', error);
		}
	}

	useEffect(() => {
		handleErrors(error, setErrors);
	}, [error]);

	return (
		<Container className={classNames(styles.Auth)}>
			<Card className={styles.authCard}>
				<Card.Body>
					<Card.Title className={styles.auth_text}>{isLogin ? 'Authorization' : 'Registration'}</Card.Title>

					{errors.username && <div className={styles.errorText}>{errors.username}</div>}
					<Form className="d-flex flex-column">
						<Form.Control
							onChange={e => setUsername(e.target.value)}
							value={username}
							className="mt-1 mb-2"
							type="text"
							placeholder="Username"
						/>

						{errors.password && <div className={styles.errorText}>{errors.password}</div>}
						<Form.Control
							onChange={e => setPassword(e.target.value)}
							value={password}
							className="mt-1"
							type="password"
							placeholder="Password"
						/>
						{errors.validation && <div className={styles.errorLogin}>{errors.validation}</div>}
						<Row className="mt-3 align-items-center">

							<Col>
								{isLogin ? <span className={styles.qText} style={{ fontSize: '20px', fontWeight: '500' }}>
									No account? <NavLink to={RouterPath.registration}> register</NavLink>
								</span>
									:
									<span className={styles.qText} style={{ fontSize: '20px', fontWeight: '500' }}>
										Have an acount? <NavLink to={RouterPath.authorization}> Log in!</NavLink>
									</span>}

							</Col>
							<Col xs="auto">
								{
									isLogin ?
										<Button onClick={login} variant="dark">Sign In</Button>
										:
										<Button onClick={registerUser} variant="dark">Registration</Button>
								}
							</Col>
						</Row>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
};
