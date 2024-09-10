const API_URL = 'http://localhost:3000'; // Cambia esto si tu API está en una URL diferente

// Función para registrar un nuevo usuario
export const register = async (name, email, password) => {
    const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
        throw new Error('Failed to register');
    }
    const data = await response.json();
    return data.token;
};

// Función para iniciar sesión
export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    const data = await response.json();
    return data.token;
};

// Función para crear un nuevo post
export const createPost = async (title, content, token) => {
    const response = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
        throw new Error('Failed to create post');
    }
    const data = await response.json();
    return data;
};

// Función para obtener todos los posts
export const fetchPosts = async (token) => {
    const response = await fetch(`${API_URL}/api/posts`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data;
};