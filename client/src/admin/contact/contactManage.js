/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Box,
  Snackbar,
  CircularProgress,
  Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../loaders/loader-spinner";

function ContactManage({ contactForms, loading }) {
  const token = localStorage.getItem("token");
  const [deleting, setDeleting] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const deleteContactFormEntry = async (id) => {
    setDeleting((prev) => ({ ...prev, [id]: true })); // Set loading for the specific ID

    try {
      const response = await fetch("http://127.0.0.1:8080/delete-contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
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
      setDeleting((prev) => ({ ...prev, [id]: false })); // Stop loading for the specific ID
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ border: "0.5px solid #ccc", borderRadius: "4px" }}>
        <Typography variant="h6" component="div" sx={{ p: 2 }}>
          Contact Form Submissions
        </Typography>
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
                      onClick={() => deleteContactFormEntry(form.id)}
                      disabled={deleting[form.id]} // Disable button during deletion
                    >
                      {deleting[form.id] ? <CircularProgress size={24} /> : <DeleteIcon />}
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
    </>
  );
}

export default ContactManage;
