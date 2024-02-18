import { FC } from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from './Auth.module.scss';
import { classNames } from "shared/lib/class-names/class-names";
import { NavLink, useLocation } from "react-router-dom";
import { RouterPath } from "shared/config/route-config/route-config";

interface AuthProps {
	className?: string;
}

export const Auth: FC<AuthProps> = ({ className }) => {

	const location = useLocation();
	const isLogin = location.pathname === RouterPath.authorization;

	return (
		<Container className={classNames(styles.Auth)}>
			<Card className={styles.authCard}>
				<Card.Body>
					<Card.Title className={styles.auth_text}>{isLogin ? 'Authorization' : 'Registration'}</Card.Title>
					<Form className="d-flex flex-column">
						<Form.Control className="mt-2" type="text" placeholder="Username" />
						<Form.Control className="mt-3" type="password" placeholder="Password" />

						<Row className="mt-3 align-items-center">

							<Col>
								{isLogin ? <span style={{ fontSize: '20px', fontWeight: '500' }}>
									No account? <NavLink to={RouterPath.registration}> register</NavLink>
								</span>
									:
									<span style={{ fontSize: '20px', fontWeight: '500' }}>
										Have an acount? <NavLink to={RouterPath.authorization}> Log in!</NavLink>
									</span>}

							</Col>
							<Col xs="auto">
								<Button variant="dark" type="submit">{isLogin ? 'Sign In' : 'Registration'}</Button>
							</Col>
						</Row>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
};
