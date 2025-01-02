const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});