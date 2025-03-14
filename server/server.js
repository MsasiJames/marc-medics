require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const nodemailer = require('nodemailer');

const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: path.join(__dirname, 'credentials/creds.json') // Replace with the path to your service account key file
});

// Your GCS bucket and file details
const BUCKET_NAME = 'xenon-lyceum-442506-i4.appspot.com';
const FILE_NAME = 'posts.json';
const CUSTOMER_FILE_NAME = 'contactForms.json';


// Authenticator
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) return res.sendStatus(401); // no token

  jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403); // expired token
      req.user = user;
      next();
  });
};

app.get('/', (req, res) => {
    res.json({ message: "Backend is active" });
});

// Utility function to clean text

app.get('/posts', async (req, res) => {
  const reqQuery = req.query;
  const category = reqQuery.category;

  try {
    const response = await fetch(`https://marcmedics.com/wp-json/wp/v2/posts?per_page=100&categories=${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error("Error getting posts from WordPress:", await response.json());
      return res.status(response.status).json({ error: 'Failed to fetch posts from WordPress' });
    }

    const posts = await response.json(); // Parse JSON data

    // Filter to include only title and content
    const filteredPosts = posts.map(post => ({
      title: post.title.rendered,
      content: post.content.rendered,
    }));

    res.json(filteredPosts); // Send the filtered data to the client
  } catch (error) {
    console.error("Error making a request to WordPress:", error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});

app.get('/all-posts', async (req, res) => {
  try {
    // Reference the file in GCS
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_NAME);

    // Check if the file exists in the bucket
    const [exists] = await file.exists();
    if (!exists) {
      console.error(`File ${FILE_NAME} does not exist in bucket ${BUCKET_NAME}.`);
      return res.status(404).json({ error: `File not found in bucket: ${FILE_NAME}` });
    }

    // Attempt to download the file from GCS into memory
    let fileData;
    try {
      [fileData] = await file.download();
    } catch (downloadError) {
      console.error("Error downloading file from GCS:", downloadError);
      return res.status(500).json({ error: 'Failed to download file from Cloud Storage' });
    }

    // Attempt to parse the file data
    let posts;
    try {
      posts = JSON.parse(fileData.toString('utf-8'));
    } catch (jsonError) {
      console.error("Error parsing JSON file data:", jsonError);
      return res.status(500).json({ error: 'Invalid JSON format in the file' });
    }

    // Extract the required fields from the posts
    const extractedPosts = posts.map(post => ({
      id:post.id,
      title: post.title,
      content: post.content,
      category: post.category
    }));

    res.json(extractedPosts); // Send the extracted data to the client
  } catch (error) {
    console.error("Unexpected error while fetching posts:", error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});


// Submit form function sends to wordpress
const submitToCF7 = async (formData) => {
    const form = new FormData();
    form.append('your-name', formData.name);
    form.append('your-email', formData.email);
    form.append('your-subject', formData.subject);
    form.append('your-message', formData.message);
    form.append('_wpcf7', '739'); // Form ID
    form.append('_wpcf7_version', '6.0.2'); // Replace with your CF7 version
    form.append('_wpcf7_locale', 'en_US'); // Locale
    form.append('_wpcf7_unit_tag', 'wpcf7-f739-o1');
    form.append('_wpcf7_container_post', '0');
  
    try {
      const response = await axios.post(
        'https://marcmedics.com/wp-json/contact-form-7/v1/contact-forms/739/feedback',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.data.status === 'mail_sent') {
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response ? error.response.data : error.message,
      };
    }
};
  
// Endpoint for contact form
async function sendEmail(name, email, subject, message){
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "notifications.midasgroup@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: 'notifications.midasgroup@gmail.com',
      to: ['info@marcmedics.com', 'jamesmsasi67@gmail.com'],
      subject: "Customer Inquiry",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #4CAF50;">Customer Inquiry</h2>
          <p style="font-size: 16px;">You have received a new message from a customer. Here are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr style="background-color: #f9f9f9;">
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Name</th>
              <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Email</th>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Subject</th>
              <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
            </tr>
            <tr>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Message</th>
              <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">Please follow up with the customer as soon as possible.</p>
        </div>
      `,
    });

    console.log('Email sent:', info.messageId);
    console.log('Message sent to:', 'info@marcmedics.com', 'jamesmsasi67@gmail.com'); 
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send email:', error.message);
    return { success: false, error: 'Failed to send email. Please try again later.' };
  }
}

// contact form endpoints
app.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate incoming request
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: All fields (name, email, message) are required.'
      });
    }

    // Reference the file in GCS
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(CUSTOMER_FILE_NAME);

    // Read the existing data from the GCS file or initialize a new array
    let existingEntries = [];
    try {
      const [fileData] = await file.download();
      existingEntries = JSON.parse(fileData.toString('utf-8'));
    } catch (error) {
      if (error.code !== 404) { // Ignore "file not found" errors (GCS returns 404 if the file doesn't exist)
        console.error("Error reading file from GCS:", error);
        throw error;
      }
    }

    // Create a new entry
    const newEntry = {
      id: uuidv4(),
      name: name,
      email: email,
      subject: subject || 'No Subject', // Handle optional subject
      message: message,
      submittedAt: new Date().toISOString() // Add a timestamp for each submission
    };

    // Add the new entry to the list
    existingEntries.push(newEntry);

    // Save the updated list back to the GCS file
    await file.save(JSON.stringify(existingEntries, null, 2), {
      contentType: 'application/json' // Set the content type for the file
    });

    // Send email notification
    const emailResponse = await sendEmail(name, email, subject, message);

    if (!emailResponse.success) {
      return res.status(502).json({
        success: false,
        message: 'Submission saved, but email notification failed.',
        emailError: emailResponse.error
      });
    }

    // Respond with success
    return res.status(200).json({
      success: true,
      message: 'Submission saved and email notification sent.'
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

app.get('/get-contact-forms', authenticateToken, async (req, res) => {
  try {
    // Reference the file in GCS
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(CUSTOMER_FILE_NAME);

    // Check if the file exists
    const [exists] = await file.exists();
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: `The file ${CUSTOMER_FILE_NAME} does not exist in the bucket ${BUCKET_NAME}.`
      });
    }

    // Download the file from GCS
    const [fileData] = await file.download();

    // Parse the file data
    const contactForms = JSON.parse(fileData.toString('utf-8'));

    // Send the data as a response
    return res.status(200).json({
      success: true,
      data: contactForms
    });
  } catch (error) {
    console.error('Error fetching contact forms data from GCS:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contact forms data. Please try again later.'
    });
  }
});

app.post('/delete-contact-form', authenticateToken, async (req, res) => {
  try {
    const { id } = req.body;

    // Validate incoming request
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: ID is required.'
      });
    }

    // Reference the file in GCS
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(CUSTOMER_FILE_NAME);

    // Read the existing data from the GCS file
    let existingEntries = [];
    try {
      const [fileData] = await file.download();
      existingEntries = JSON.parse(fileData.toString('utf-8'));
    } catch (error) {
      if (error.code === 404) {
        // If the file doesn't exist, return an error
        return res.status(404).json({
          success: false,
          message: 'No contact form entries found.'
        });
      } else {
        console.error("Error reading file from GCS:", error);
        throw error;
      }
    }

    // Filter the entries to:
    // 1. Exclude the one with the matching ID
    // 2. Exclude any entry that doesn't have an `id` key
    const updatedEntries = existingEntries.filter(entry => entry.id && entry.id !== id);

    // Check if any entries were deleted
    const wasEntryRemoved = updatedEntries.length < existingEntries.length;

    if (!wasEntryRemoved) {
      return res.status(404).json({
        success: false,
        message: 'No entry found with the provided ID, or there were no invalid entries to clean up.'
      });
    }

    // Save the updated list back to the GCS file
    await file.save(JSON.stringify(updatedEntries, null, 2), {
      contentType: 'application/json' // Set the content type for the file
    });

    // Respond with success
    return res.status(200).json({
      success: true,
      message: 'Entry successfully deleted and invalid entries removed.'
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// post management endpoints
app.post('/create-new-post', authenticateToken, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const id = uuidv4()
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_NAME);

    // Read the existing JSON file
    let jsonData = [];
    try {
      const [fileExists] = await file.exists();
      if (fileExists) {
        const [contents] = await file.download();
        jsonData = JSON.parse(contents.toString());
      }
    } catch (error) {
      console.error('Error reading file:', error);
    }

    // Append new post
    jsonData.push({ id, title, content, category });

    // Write updated JSON back to Google Cloud Storage
    await file.save(JSON.stringify(jsonData, null, 2), {
      contentType: 'application/json',
    });

    return res.status(200).json({ message: 'Post added successfully' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/delete-post', authenticateToken, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_NAME);

    // Read the existing JSON file
    let jsonData = [];
    try {
      const [fileExists] = await file.exists();
      if (fileExists) {
        const [contents] = await file.download();
        jsonData = JSON.parse(contents.toString());
      }
    } catch (error) {
      console.error('Error reading file:', error);
    }

    // Filter out the post to be deleted
    const updatedData = jsonData.filter(post => post.id !== id);

    if (jsonData.length === updatedData.length) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Write updated JSON back to Google Cloud Storage
    await file.save(JSON.stringify(updatedData, null, 2), {
      contentType: 'application/json',
    });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Admin login
app.post('/login', async (req, res) => {
  const body = req.body;
  const { username, password } = body;

  const savedUsername = process.env.ADMIN_USERNAME;
  const savedPassword = process.env.ADMIN_PASSWORD;

  console.log('Saved username: ', savedUsername);
  console.log('Saved password: ', savedPassword);

  console.log('Username: ', username);
  console.log('Password: ', password);

  if (username === savedUsername && password === savedPassword) {
    console.log('Login successful');
    const token = jwt.sign({username: username}, secretKey, {expiresIn: '1d'})

    return res.status(200).json({ message: 'Login successful', token: token }); // Send a JSON response
  } else {
    console.log('Could not login. Please try again.');
    return res.status(500).json({
      message: 'Invalid username or password. Please try again',
    });
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});