// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JavaScript, and audio)
app.use(express.static(path.join(__dirname,)));

// Home route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
