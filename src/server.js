const port = process.env.PORT || 3000;
const axios = require('axios');
var radio = require("radio-stream");
var http = require('http');
let y = "http://localhost:4000/api/hawaslink";
const getUrl = async () => { 
    const url = await axios.get('http://localhost:4000/api/hawaslink');
  y = JSON.stringify(url.data.link);
}
 setInterval( getUrl, console.log(y), 150000)

console.log(y);

var stream = radio.createReadStream(y);

 var clients = [];
 
 stream.on("connect", function() {
   console.error("Radio Stream connected!");
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
     console.log('Client connected; streaming'); 
 });
server.listen(port, (err) => {
    if (err) {
        console.log('Something went wrong');
    }    
    console.log(`Server is running on port ${port}`);
});
