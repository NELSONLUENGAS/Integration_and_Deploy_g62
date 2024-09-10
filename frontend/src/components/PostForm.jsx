import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { createPost } from '../api';
import { useAuth } from '../context/AuthContext';

const PostForm = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const { token, notify, setNotify } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createPost(title, content, token);
			setTitle('');
			setContent('');
			setNotify(!notify);
			// Aquí puedes añadir una función para actualizar la lista de posts
		} catch (error) {
			console.error('Error al crear el post:', error);
		}
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Content</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
					/>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
				>
					Create Post
				</Button>
			</Form>
		</Container>
	);
};

export default PostForm;
