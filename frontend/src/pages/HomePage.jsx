import React from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const HomePage = () => {
	return (
		<div>
			<h1>Home</h1>
			<PostForm />
			<PostList />
		</div>
	);
};

export default HomePage;
