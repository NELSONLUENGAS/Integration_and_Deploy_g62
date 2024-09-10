import React from 'react';
import AuthForm from '../components/AuthForm';
import { Container, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col md={6}>
					<h1>Login</h1>
					<AuthForm isRegistering={false} />
				</Col>
			</Row>
		</Container>
	);
};

export default LoginPage;
