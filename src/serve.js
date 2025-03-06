const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Serve static files from the src directory
app.use(express.static(path.join(__dirname)));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Web server running at http://localhost:${port}`);
  console.log(`Make sure your audio stream server is running on port 3000`);
}); 