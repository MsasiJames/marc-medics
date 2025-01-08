const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: "Backend is active" });
});

app.get('/posts', async (req, res) => {
    try {
        const response = await fetch('https://marcmedics.com/wp-json/wp/v2/posts?per_page=100', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error("Error getting posts from WordPress:", await response.json());
            return res.status(response.status).json({ error: 'Failed to fetch posts from WordPress' });
        }

        const data = await response.json(); // Parse JSON data
        res.json(data); // Send the data to the client
    } catch (error) {
        console.error("Error making a request to WordPress:", error);
        res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
});

// Submit form function
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
  app.post('/contact', async (req, res) => {
    try {
      const reqBody = req.body;
  
      // Validate incoming request
      if (!reqBody.name || !reqBody.email || !reqBody.message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }
  
      const result = await submitToCF7(reqBody);
  
      if (result.success) {
        return res.status(200).json({ success: true, message: result.message });
      } else {
        return res.status(500).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});