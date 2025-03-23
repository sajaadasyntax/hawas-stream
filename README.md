# Dual Audio Stream Player

A web application that streams audio from two different internet radio sources and provides a web interface to listen to them.

## Features

- Streams audio from two different internet radio sources
- Provides a simple web interface with dual HTML5 audio players
- Real-time status updates for both audio streams
- Automatic stream refresh to prevent timeouts and interruptions
- Error handling and recovery for network issues including 504 Gateway Timeouts

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```

## Usage

You can run all servers (both audio stream servers and the web server) with a single command:

```
npm start
```

Or run them separately:

- Start the first audio stream server (UK 24):
  ```
  npm run start-stream1
  ```

- Start the second audio stream server (UK 5):
  ```
  npm run start-stream2
  ```

- Start the web server:
  ```
  npm run start-web
  ```

## Accessing the Application

- First Audio Stream Server: http://localhost:3001
- Second Audio Stream Server: http://localhost:3002
- Web Interface: http://localhost:8080

## Stream Sources

- Stream 1: http://uk24freenew.listen2myradio.com:14899
- Stream 2: http://uk5freenew.listen2myradio.com:32436

## How It Works

- The first audio stream server (server.js) connects to the UK 24 radio source and streams the audio to clients.
- The second audio stream server (server2.js) connects to the UK 5 radio source and streams the audio to clients.
- The web server (serve.js) serves a simple HTML page with two audio players that connect to the audio streams.
- Each HTML5 audio player connects to its respective audio stream server to play the audio.
- Streams automatically refresh every 3 minutes (configurable) to prevent interruptions.
- Error handling mechanisms detect and recover from connection issues and timeouts. 