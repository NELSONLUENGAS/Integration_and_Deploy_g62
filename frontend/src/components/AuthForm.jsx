import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { login, register } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isRegistering }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login: loginUser } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isRegistering) {
				await register(name, email, password);
			}
			const token = await login(email, password);
			loginUser(token);
			navigate('/');
		} catch (error) {
			console.error('Error durante la autenticación:', error);
		}
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				{isRegistering && (
					<Form.Group className="mb-3">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</Form.Group>
				)}
				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
				>
					{isRegistering ? 'Register' : 'Login'}
				</Button>
			</Form>
		</Container>
	);
};

export default AuthForm;
