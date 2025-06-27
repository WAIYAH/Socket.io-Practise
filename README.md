# Socket.io-Practise
# Real-Time Chat App with Socket.IO

A simple real-time chat application built with Socket.IO, Node.js, Express, and React (Vite). Users can join rooms, send messages, and see real-time notifications for user joins/leaves.

## Project Structure
socketio-project/ ├── client/ # React frontend (Vite) ├── server/ # Node.js/Express backend ├── .gitignore ├── README.md



## Prerequisites
- Node.js (v16 or higher)
- pnpm (install with `npm install -g pnpm`)

## Setup Instructions

### Server
1. Navigate to the server directory:
   ```bash
   cd server

   pnpm install

   node server.js


   Client
Navigate to the client directory:

cd client
Install dependencies:

pnpm install
Start the development server:

pnpm dev

The client runs on http://localhost:5173.

Usage
Open http://localhost:5173 in multiple browser tabs.
Enter a username and room name to join a chat room.
Send messages and see real-time updates in the same room.
Close a tab to see disconnection notifications.

Features
Join chat rooms
Send and receive messages in real-time
User join/leave notifications

Technologies
Backend: Node.js, Express, Socket.IO
Frontend: React, Vite, Socket.IO-client

Package Manager: pnpm

Next Steps
Add MongoDB for persistent chat history
Implement user authentication

Enhance UI with Tailwind CSS or Material-UI