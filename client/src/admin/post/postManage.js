import React, { useState } from 'react';
import {  Table, TableBody, TableCell, 
          TableContainer, TableHead, TableRow, 
          Paper, Modal, Box, 
          Typography, Select, MenuItem, 
          IconButton, TextField, TextareaAutosize,
          Button, Alert, Dialog, 
          DialogActions, DialogContent, DialogContentText,
          DialogTitle, Snackbar, CircularProgress } from '@mui/material';

import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';

import Loader from "../../loaders/loader-spinner";

const categories = [
    { label: 'All Categories', id: 'all' },
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

function getCategoryLabel(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.label : 'Unknown';
}

const formatContent = (content) => {
  if (!content) return [];
  // Remove HTML tags and split the content by '.'
  const sentences = content.replace(/<[^>]*>?/gm, '').split('.');
  // Group sentences in chunks of 4
  const formattedContent = sentences.reduce((acc, sentence, index) => {
      if (sentence.trim() === '') return acc; // Skip empty sentences
      const chunkIndex = Math.floor(index / 4);
      acc[chunkIndex] = acc[chunkIndex] || [];
      acc[chunkIndex].push(sentence.trim());
      return acc;
  }, []);
  // Return chunks joined by '. ' as individual paragraphs
  return formattedContent.map(chunk => chunk.join('. ') + '.');
};

function PostManage({ posts, setFetchDataAgain, loading }) {
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');      // to filter posts in the table
    const [createPostLoading, setCreatePostLoading] = useState(false);
    const [deletePostLoading, setDeletePostLoading] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDeleteId, setPostToDeleteId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackBarMessage, setSnackbarMessage] = useState('');

    const [newPost, setNewPost] = useState({
      title: '',
      content: '',
      category: ''
    });

    const handleOpen = (content) => {
        setSelectedContent(content);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const filteredPosts = selectedCategory === 'all' ? posts : posts.filter(post => post.category === selectedCategory);

    // Create post modal handlers
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => setOpenCreateModal(false);

    const handleCreatePost = async () => {
      console.log(newPost);
      setCreatePostLoading(true)

      try {
        const response = await fetch('http://127.0.0.1:8080/create-new-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${token}`
          },
          body: JSON.stringify({
            title: newPost.title,
            content: newPost.content,
            category: newPost.category
          })
        })

        if(response.ok){
          setSnackbarMessage('Post created successfully')
          setSnackbarOpen(true)
          setOpenCreateModal(false)
          console.log('Post created successfully: ', response.message);
          setFetchDataAgain(Math.random())
        }
        setCreatePostLoading(false);
      } catch (error) {
        console.error('Error creating post:', error);
        setCreatePostLoading(false);
      }
    }

    // delete dialog handlers and delete post function
    const handleOpenDeleteDialog = (id) => {
      console.log("Setting post ID to delete:", id);
      setPostToDeleteId(id);
      setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setPostToDeleteId(null);
    };

    const handleDeletePost = async () => {
        console.log(postToDeleteId);
        if (postToDeleteId) {
            setDeletePostLoading(true);
            console.log(postToDeleteId);
            try {
              const response = await fetch('http://127.0.0.1:8080/delete-post', {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                  id: postToDeleteId
                })
              })

              if(response.ok){
                setSnackbarMessage('Post deleted successfully');
                setDeletePostLoading(false);
                setSnackbarOpen(true);
                setFetchDataAgain(Math.random())
                return
              }
              setSnackbarMessage('Post was deleted successfully');
              setDeletePostLoading(false);
              setSnackbarOpen(true);
            } catch (error) {
                console.log('Error while deleting a post: ', error);
                setDeletePostLoading(false);
                setSnackbarMessage('Error while deleting a post');
                setSnackbarOpen(true);
            } finally {
              handleCloseDeleteDialog();
            }
            
        }
        
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    return (
        <>
          { loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                    <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        sx={{ marginBottom: '10px', marginRight: '15px' }}
                        size='small'
                      >
                      {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>
                      ))}
                    </Select>

                    <IconButton sx={{ marginBottom: '10px' }} onClick={handleOpenCreateModal} color='success'>
                      <PostAddIcon fontSize='large' />
                    </IconButton>
                </Box>
                <TableContainer component={Paper} sx={{ border: "0.5px solid #ccc", borderRadius: "4px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Content</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredPosts.map((post, index) => (
                                <TableRow key={index}>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell onClick={() => handleOpen(post.content)} style={{ cursor: 'pointer',}}>
                                        {post.content.split(".").slice(0, 2).join(".") + (post.content.split(".").length > 2 ? '...' : '')}
                                    </TableCell>
                                    <TableCell>{getCategoryLabel(post.category)}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpenDeleteDialog(post.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* VIEW CONTENT MODAL */}
                <Modal open={open} onClose={handleClose}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4, overflowY: 'scroll', borderRadius: '15px' }}>
                        <Typography variant="h6">Full Content</Typography>
                        <Typography variant="body1" sx={{ mt: 2, maxHeight: '300px' }}>
                          {formatContent(selectedContent).map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </Typography>
                    </Box>
                </Modal>

                {/* CREATE POST MODAL */}
                <Modal open={openCreateModal} onClose={handleCloseCreateModal}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      height: "auto",
                      width: 600,
                      backgroundColor: "white",
                      borderRadius: "15px",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: "center" }}>
                      Create New Post
                    </Typography>
                    <TextField 
                      label="Title" 
                      size="small" 
                      sx={{ mb: 2 }} 
                      fullWidth
                      onChange={(e) => {
                        setNewPost((prev) => ({
                          ...prev,
                          title: e.target.value
                        }))
                      }}
                    />
                    <Select
                      value={newPost['category']}
                      onChange={(e) => {
                        setNewPost((prev) => ({ 
                          ...prev,
                          category: e.target.value
                        }));
                      }}
                      sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                    >
                      {categories.filter((category) => category.label !== "All Categories").map((category) => (         // all categories option shouldn't be available when creating a post, it's only for filtering table posts
                        <MenuItem key={category.id} value={category.id}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextareaAutosize
                      aria-label="News content"
                      minRows={10}
                      placeholder="Enter news content here..."
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        marginBottom: "16px",
                      }}
                      onChange={(e) => {
                        setNewPost((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }}
                    />
                    <Button variant="contained" color="primary" onClick={handleCreatePost} fullWidth sx={{textTransform: 'none'}}>
                      {createPostLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Post'}
                    </Button>
                  </Box>
                </Modal>

                {/* DELETE POST DIALOG */}
                <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure you want to delete this post?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
                        <Button onClick={handleDeletePost} color="error">
                          {deletePostLoading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {snackBarMessage}
                    </Alert>
                </Snackbar>

            </Box>
          )}
          
        </>
    );
}

export default PostManage;
