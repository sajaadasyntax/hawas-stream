# Audio Stream Player

A simple web application that streams audio from an internet radio source and provides a web interface to listen to it.

## Features

- Streams audio from an internet radio source
- Provides a simple web interface with an HTML5 audio player
- Real-time status updates for the audio stream
- **Auto-refresh functionality** to prevent stream interruptions
- Manual refresh option for immediate stream restart

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```

## Usage

You can run both the audio stream server and web server with a single command:

```
npm start
```

Or run them separately:

- Start the audio stream server:
  ```
  npm run start-stream
  ```

- Start the web server:
  ```
  npm run start-web
  ```

## Accessing the Application

- Audio Stream Server: http://localhost:3000
- Web Interface: http://localhost:8080

## How It Works

- The audio stream server (server.js) connects to an internet radio source and streams the audio to clients.
- The web server (serve.js) serves a simple HTML page with an audio player that connects to the audio stream.
- The HTML5 audio player connects to the audio stream server to play the audio.
- The player automatically refreshes the stream at configurable intervals (default: 5 minutes) to prevent interruptions.
- A countdown timer shows when the next refresh will occur.
- Users can manually refresh the stream at any time using the "Refresh Now" button.
- If an error occurs with the stream, it will automatically attempt to refresh after 5 seconds. 