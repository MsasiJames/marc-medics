/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, 
  Paper, IconButton, Box, 
  Snackbar, CircularProgress, Alert,
  Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../loaders/loader-spinner";

function ContactManage({ contactForms, loading }) {
  const token = localStorage.getItem("token");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [contactFormToDeleteId, setContactFormsToDeleteId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteFormLoading, setDeleteFormLoading] = useState(false);



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const deleteContactFormEntry = async (id) => {

    try {
      const response = await fetch("http://127.0.0.1:8080/delete-contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: contactFormToDeleteId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSnackbar({ open: true, message: "Entry deleted successfully!", severity: "success" });
      } else {
        console.error("Error while deleting contact form entry");
        setSnackbar({ open: true, message: "Failed to delete entry.", severity: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({ open: true, message: "An error occurred while deleting the entry.", severity: "error" });
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleOpenDeleteDialog = (id) => {
    console.log("Setting post ID to delete:", id);
    setContactFormsToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
      setDeleteDialogOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ border: "0.5px solid #ccc", borderRadius: "4px" }}>
        {/* <Typography variant="h6" component="div" sx={{ p: 2 }}>
          Contact Form Submissions
        </Typography> */}
        {loading ? (
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Submitted At</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactForms.map((form, index) => (
                <TableRow key={index}>
                  <TableCell>{form.name}</TableCell>
                  <TableCell>{form.email}</TableCell>
                  <TableCell>{form.subject}</TableCell>
                  <TableCell>{form.message}</TableCell>
                  <TableCell>{formatDate(form.submittedAt)}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleOpenDeleteDialog(form.id)
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* DELETE POST DIALOG */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
              <DialogContentText>Are you sure you want to delete this contact form record?</DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
              <Button onClick={deleteContactFormEntry} color="error">
                {deleteFormLoading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
              </Button>
          </DialogActions>
      </Dialog>
    </>
  );
}

export default ContactManage;
