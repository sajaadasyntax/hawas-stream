const port = process.env.PORT || 3002;
const axios = require('axios');
var radio = require("radio-stream");
var http = require('http');
var url = "http://uk5freenew.listen2myradio.com:32436";
var stream = radio.createReadStream(url);

var clients = [];

stream.on("connect", function() {
  console.error("Radio Stream 2 connected!");
  console.error(stream.headers);
});


stream.on("error", function(r) {
    console.error(r);
});
  
// When a chunk of data is received on the stream, push it to all connected clients
stream.on("data", function (chunk) {
     try {
        if (clients.length > 0) {
            for  (client in clients) {
                clients[client].write(chunk);
            }
        }
    } catch (error) {
        console.error("Error while streaming:", error);
        // Send error response to the client
        for (client in clients) {
            clients[client].writeHead(500, { 'Content-Type': 'text/plain' });
            clients[client].end('Streaming error occurred.');
        }
    }
});

// When a 'metadata' event happens, usually a new song is starting.
stream.on("metadata", function(title) {
  console.error(title);
});

// Listen on a web port and respond with a chunked response header. 
var server = http.createServer(function(req, res){ 
    res.writeHead(200,{
        "Content-Type": "audio/mpeg",
        'Transfer-Encoding': 'chunked'
    });
    // Add the response to the clients array to receive streaming
    console.log(res);
    clients.push(res);
    console.log('Client connected to stream 2; streaming'); 
});
server.listen(port, (err) => {
    if (err) {
        console.log('Something went wrong with stream 2');
    }    
    console.log(`Stream 2 server is running on port ${port}`);
}); 