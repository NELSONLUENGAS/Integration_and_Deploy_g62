import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
	const { token, logout } = useAuth();

	return (
		<Navbar
			bg="light"
			expand="lg"
		>
			<Navbar.Brand
				as={NavLink}
				to="/"
			>
				Home
			</Navbar.Brand>
			<Nav className="mr-auto">
				{!token && (
					<>
						<Nav.Link
							as={NavLink}
							to="/login"
						>
							Login
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							to="/register"
						>
							Register
						</Nav.Link>
					</>
				)}
				{token && (
					<Button
						onClick={logout}
						variant="outline-danger"
					>
						Logout
					</Button>
				)}
			</Nav>
		</Navbar>
	);
};

export default NavBar;
