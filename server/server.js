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

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});