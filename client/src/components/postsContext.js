import React, { createContext, useState, useEffect } from 'react';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const [allPosts, setAllPosts] = useState([]);

    const getAllPosts = async () => {
        try {
            const res = await fetch(`https://marc-medics-backend-dot-xenon-lyceum-442506-i4.as.r.appspot.com/all-posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                const data = await res.json();
                console.log('Fetched all posts successfully', data);
                setAllPosts(data);
            } else {
                console.log('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []); // Fetch posts only once when the provider mounts

    return (
        <PostsContext.Provider value={{ allPosts, setAllPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsContext;
