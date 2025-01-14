require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const nodemailer = require('nodemailer');

const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: "Backend is active" });
});

// Utility function to clean text
function cleanText(inputText) {
  if (!inputText) return '';

  // Step 1: Unescape HTML entities
  let unescapedText = inputText
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

  // Step 2: Decode escaped Unicode characters like \u003C (e.g., <header>)
  unescapedText = unescapedText.replace(/\\u([0-9A-Fa-f]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)));

  // Step 3: Remove HTML tags (preserve the text content)
  let cleanedText = unescapedText.replace(/<[^>]+>/g, '');

  // Step 4: Remove inline styles, classes, and other unnecessary attributes
  cleanedText = cleanedText.replace(/class="[^"]*"|style="[^"]*"|data-[^=]+="[^"]*"/g, '');

  // Step 5: Remove embedded image metadata, links, and special artifacts
  cleanedText = cleanedText.replace(/\[.*?\]/g, ''); // Remove square-bracketed metadata like [Blue stem cells]
  cleanedText = cleanedText.replace(/http[s]?:\/\/[^\s]+/g, ''); // Remove URLs
  cleanedText = cleanedText.replace(/Credit:.+$/, ''); // Remove credit lines (e.g., Credit: http://...)
  
  // Step 6: Replace special HTML character sequences (e.g., '&#8211;' for '–')
  cleanedText = cleanedText.replace(/&#8211;/g, '–');

  // Step 7: Remove extra whitespace and normalize text
  return cleanedText.trim().replace(/\s+/g, ' ');
}


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
    const response = await fetch(`https://marcmedics.com/wp-json/wp/v2/posts?per_page=100`, {
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
      title: cleanText(post.title.rendered),
      content: cleanText(post.content.rendered),
      category: post.categories[0]
    }));

    res.json(filteredPosts); // Send the filtered data to the client
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
async function sendEmail(name, email, subject, message){
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "notify.marcmedics@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: 'notify.marcmedics@gmail.com',
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

    // Submit to Contact Form 7 or other external service
    const result = await submitToCF7({ name, email, subject, message });

    // Send email notification
    const emailResponse = await sendEmail(name, email, subject, message);

    if (!emailResponse.success) {
      return res.status(502).json({ 
        success: false, 
        message: 'Submission successful, but email notification failed.',
        emailError: emailResponse.error 
      });
    }

    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Submission successful, and email notification sent.' 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: 'Submission failed. Please try again later.',
        submissionError: result.message 
      });
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again later.' 
    });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});