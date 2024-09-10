import React, { useEffect, useState } from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import { fetchPosts } from '../api';
import { useAuth } from '../context/AuthContext';

const PostList = () => {
	const [posts, setPosts] = useState([]);
	const { token, notify } = useAuth();

	useEffect(() => {
		const getPosts = async () => {
			const data = await fetchPosts(token);
			setPosts(data);
		};
		getPosts();
	}, [token, notify]);

	return (
		<Container>
			<ListGroup>
				{posts.map((post) => (
					<ListGroup.Item key={post.id}>
						<h5>{post.title}</h5>
						<p>{post.content}</p>
						<p className="text-muted">
							Posted by: {post.user_name} ({post.user_email})
						</p>
					</ListGroup.Item>
				))}
			</ListGroup>
		</Container>
	);
};

export default PostList;
