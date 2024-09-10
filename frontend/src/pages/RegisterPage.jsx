import React from 'react';
import AuthForm from '../components/AuthForm';
import { Container, Row, Col } from 'react-bootstrap';

const RegisterPage = () => {
	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col md={6}>
					<h1>Register</h1>
					<AuthForm isRegistering={true} />
				</Col>
			</Row>
		</Container>
	);
};

export default RegisterPage;
