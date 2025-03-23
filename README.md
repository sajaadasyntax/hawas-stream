# Dual Audio Stream Player

A web application that streams audio from two different internet radio sources and provides a web interface to listen to them.

## Features

- Streams audio from two different internet radio sources
- Provides a simple web interface with dual HTML5 audio players
- Real-time status updates for both audio streams
- Automatic stream refresh to prevent timeouts and interruptions
- Error handling and recovery for network issues including 504 Gateway Timeouts
- Single server setup with multiple stream routes

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```

## Usage

Run the server with:

```
npm start
```

This will start the web server on port 8080 that serves both the web interface and the audio streams.

## Accessing the Application

- Web Interface: http://localhost:8080
- Radio Stream: http://localhost:8080/Radio
- Quran Stream: http://localhost:8080/Quran

## Stream Sources

- Radio Stream: http://uk24freenew.listen2myradio.com:14899
- Quran Stream: http://uk5freenew.listen2myradio.com:32436

## How It Works

- The server connects to both radio sources and streams the audio through separate routes
- The web interface provides two audio players that connect to the respective routes
- Each audio player has its own controls, status indicators, and settings
- Streams automatically refresh every 3 minutes (configurable) to prevent interruptions
- Error handling mechanisms detect and recover from connection issues and timeouts

## Technical Details

- Single Express server serving both the web interface and audio streams
- Routes-based approach (/Radio and /Quran) for different audio sources
- Chunked transfer encoding for continuous streaming
- Client disconnection handling to free up resources
- Automatic stream monitoring and recovery 