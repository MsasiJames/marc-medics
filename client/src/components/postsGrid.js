import React, { useState, useEffect } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box, Card, CardContent, Typography, Button, Modal, ModalClose, Sheet } from '@mui/joy';

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

const PostModal = ({ post, open, onClose }) => {
    return (
        <Modal
            aria-labelledby="modal-title"
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    maxWidth: '900px',
                    width: '90%',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(80px)'
                }}
            >
                <ModalClose variant="outlined" />
                <Typography
                    level="h2"
                    fontSize="xl2"
                    sx={{ mb: 2, color: 'primary.400' }}
                >
                    {post?.title}
                </Typography>
                <Typography level="body1" sx={{ color: 'white' }}>
                    {post?.content?.replace(/<[^>]*>?/gm, '')}
                </Typography>
            </Sheet>
        </Modal>
    );
};

const PostsGrid = ({ posts }) => {
    const [columns, setColumns] = useState(3);
    const [selectedPost, setSelectedPost] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setColumns(1);
            } else if (window.innerWidth < 900) {
                setColumns(2);
            } else {
                setColumns(3);
            }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleOpenModal = (post) => {
        setSelectedPost(post);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPost(null);
    };

    const distributeItems = () => {
        const cols = Array.from({ length: columns }, () => []);
        posts.forEach((post, index) => {
            cols[index % columns].push(post);
        });
        return cols;
    };

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    p: 2,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: 2,
                }}
            >
                {distributeItems().map((column, colIndex) => (
                    <Box
                        key={colIndex}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        {column.map((post, index) => (
                            <Card
                                key={`${colIndex}-${index}`}
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(20px)',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                    },
                                    height: `${Math.max(50, Math.random() * 150 + 250)}px`,
                                }}
                            >
                                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Typography 
                                        level="h2" 
                                        fontSize="lg" 
                                        sx={{ mb: 0.5, color: 'primary.400' }}
                                    >
                                        {post.title}
                                    </Typography>
                                    <Typography 
                                        level="body2" 
                                        sx={{ mb: 2, color: 'white', flexGrow: 1 }}
                                    >
                                        {post.content.replace(/<[^>]*>?/gm, '').slice(0, 350)}...
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenModal(post)}
                                        sx={{ alignSelf: 'flex-start' }}
                                    >
                                        Read More
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                ))}
            </Box>
            <PostModal 
                post={selectedPost}
                open={modalOpen}
                onClose={handleCloseModal}
            />
        </CssVarsProvider>
    );
};

export default PostsGrid;