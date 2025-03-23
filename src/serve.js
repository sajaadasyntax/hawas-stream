const express = require('express');
const path = require('path');
const radio = require("radio-stream");
const app = express();
const port = 8080;

// Radio stream URLs
const radioStreamUrl = "http://uk24freenew.listen2myradio.com:14899";
const quranStreamUrl = "http://uk5freenew.listen2myradio.com:32436";

// Create radio streams
const radioStream = radio.createReadStream(radioStreamUrl);
const quranStream = radio.createReadStream(quranStreamUrl);

// Event handlers for Radio stream
let radioClients = [];
radioStream.on("connect", function() {
  console.log("Radio Stream connected!");
});

radioStream.on("error", function(error) {
  console.error("Radio Stream error:", error);
});

radioStream.on("data", function(chunk) {
  try {
    if (radioClients.length > 0) {
      for (let client in radioClients) {
        radioClients[client].write(chunk);
      }
    }
  } catch (error) {
    console.error("Error while streaming radio:", error);
    for (let client in radioClients) {
      radioClients[client].writeHead(500, { 'Content-Type': 'text/plain' });
      radioClients[client].end('Radio streaming error occurred.');
    }
  }
});

radioStream.on("metadata", function(title) {
  console.log("Radio metadata:", title);
});

// Event handlers for Quran stream
let quranClients = [];
quranStream.on("connect", function() {
  console.log("Quran Stream connected!");
});

quranStream.on("error", function(error) {
  console.error("Quran Stream error:", error);
});

quranStream.on("data", function(chunk) {
  try {
    if (quranClients.length > 0) {
      for (let client in quranClients) {
        quranClients[client].write(chunk);
      }
    }
  } catch (error) {
    console.error("Error while streaming Quran:", error);
    for (let client in quranClients) {
      quranClients[client].writeHead(500, { 'Content-Type': 'text/plain' });
      quranClients[client].end('Quran streaming error occurred.');
    }
  }
});

quranStream.on("metadata", function(title) {
  console.log("Quran metadata:", title);
});

// Serve static files from the src directory
app.use(express.static(path.join(__dirname)));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Radio stream route
app.get('/Radio', (req, res) => {
  res.writeHead(200, {
    "Content-Type": "audio/mpeg",
    'Transfer-Encoding': 'chunked'
  });
  
  radioClients.push(res);
  console.log('Client connected to Radio stream');
  
  // Remove client when connection closes
  req.on('close', () => {
    const index = radioClients.indexOf(res);
    if (index !== -1) {
      radioClients.splice(index, 1);
      console.log('Client disconnected from Radio stream');
    }
  });
});

// Quran stream route
app.get('/Quran', (req, res) => {
  res.writeHead(200, {
    "Content-Type": "audio/mpeg",
    'Transfer-Encoding': 'chunked'
  });
  
  quranClients.push(res);
  console.log('Client connected to Quran stream');
  
  // Remove client when connection closes
  req.on('close', () => {
    const index = quranClients.indexOf(res);
    if (index !== -1) {
      quranClients.splice(index, 1);
      console.log('Client disconnected from Quran stream');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Radio stream available at http://localhost:${port}/Radio`);
  console.log(`Quran stream available at http://localhost:${port}/Quran`);
}); 