/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { Box, Input, Select, Option, Button } from '@mui/joy';
import CssBaseline from '@mui/joy/CssBaseline';

import PostsContext from '../components/postsContext';

// Top navigation bar
import Header from '../components/topNavBar copy';
import Footer from '../components/footer';

// background image
import dna from '../images/dna.png';

// post Grid
import PostsGrid from '../components/postsGrid';

// loading indicator
import Loader from '../loaders/loader';

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: '#e8f5fe',
                    100: '#b9e2fc',
                    200: '#8acefa',
                    300: '#5bbaf8',
                    400: '#2ca6f6',
                    500: '#0d93e3',
                    600: '#0a72b1',
                    700: '#07527f',
                    800: '#04324d',
                    900: '#01121b',
                },
                background: {
                    body: '#ffffff',
                    surface: '#f8fafc',
                },
            },
        },
    },
    fontFamily: {
        body: "'Roboto', sans-serif",
        display: "'Montserrat', sans-serif",
    },
});

function Specialities() {
    // Categories with ID to filter posts
    const categories = [
        { label: 'Cosmetic Surgery', id: 11 },
        { label: 'Dental Medicine', id: 42 },
        { label: 'Elderly Medicine', id: 13 },
        { label: 'General Medicine', id: 41 },
        { label: 'Orthopaedic Surgery and Treatment', id: 12 },
        { label: 'Safety', id: 43 },
        { label: 'Sports Medicine', id: 10 },
        { label: 'Stem Cell Banking', id: 15 },
        { label: 'Stem Cell Treatment', id: 9 },
    ];

    // Selected category id
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Search query
    const [searchQuery, setSearchQuery] = useState('');

    // Store filtered Posts
    const [filteredPosts, setFilteredPosts] = useState([]);

    // Get all posts from context
    const { allPosts } = useContext(PostsContext);

    // Filter posts based on category ID
    const filterPosts = () => {
        if (selectedCategory) {
            const filtered = allPosts.filter(post => post.category === selectedCategory);
            setFilteredPosts(filtered);
        }
    };

    // Filter posts dynamically based on search query
    const handleSearch = (query) => {
        setSearchQuery(query);
    
        // Filter posts that match the search query
        const filtered = allPosts.filter(post => {
            const title = post.title || '';                     /// to handle undefined error
            const description = post.description || '';         // to handle undefined error
    
            return (
                title.toLowerCase().includes(query.toLowerCase()) || 
                description.toLowerCase().includes(query.toLowerCase())
            );
        });
    
        setFilteredPosts(filtered);
    };
    

    // loading flag
    const isLoading = allPosts.length > 0 ? false : true;

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    position: 'relative',
                    overflowX: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${dna})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 100.1%',
                        zIndex: -1,
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                }}
            >
                {/* Header */}
                <Header />

                {/* Input and Filter Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginY: 5,
                        padding: 1,
                    }}
                >
                    <Input
                        placeholder="Search.."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)} // Call handleSearch on input change
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            width: '200px',
                            backdropFilter: 'blur(50px)',
                        }}
                    />

                    <Select
                        placeholder="Select a category"
                        sx={{
                            marginLeft: 2,
                            marginRight: 2,
                            width: '200px',
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                            backdropFilter: 'blur(50px)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'transparent !important', // Prevent hover background
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'transparent !important', // Prevent focus highlight
                            },
                            '& .MuiSelect-select': {
                                '&:hover': {
                                    backgroundColor: 'transparent !important', // Prevent hover on inner element
                                },
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <Option
                                key={category.id}
                                value={category.label}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.label}
                            </Option>
                        ))}
                    </Select>

                    <Button
                        size="md"
                        variant="solid"
                        disabled={!selectedCategory}
                        sx={{
                            bgcolor: 'primary.50',
                            color: 'primary.700',
                            '&:hover': { bgcolor: 'primary.100' },
                        }}
                        onClick={filterPosts} // Call filterPosts on click
                    >
                        Filter
                    </Button>
                </Box>

                {/* Post Grid Section */}
                {isLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '250px',
                        }}
                    >
                        <Loader />
                    </Box>
                ) : (
                    <PostsGrid posts={filteredPosts.length > 0 ? filteredPosts : allPosts} />
                )}
            </Box>
            <Footer />
        </CssVarsProvider>
    );
}

export default Specialities;
