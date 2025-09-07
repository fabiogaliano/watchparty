# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WatchParty is a web application for synchronized video watching with features like screen sharing, virtual browsers, chat, and video calls. It's built with React + TypeScript frontend and Node.js + TypeScript backend using Socket.IO for real-time communication.

## Architecture

### Frontend (`src/`)
- **React 18** with TypeScript using **Vite** as build tool
- **Semantic UI React** for components
- **Socket.IO client** for real-time communication
- Component structure: App → TopBar/Chat/Controls/VideoChat/VBrowser
- Key utilities in `src/utils/` for media detection, networking, and helpers

### Backend (`server/`)
- **Bun** runtime with TypeScript using **bun --watch** for development hot reload
- **Express** server with **Socket.IO** for WebSocket handling
- **Room-based architecture** - each room manages synchronized playback state
- **VM management** for virtual browsers (Docker/DigitalOcean/Hetzner/Scaleway providers)
- **Optional services**: Redis (metrics), PostgreSQL (persistence), Firebase (auth), Stripe (subscriptions)

### Key Backend Components
- `server/server.ts` - Main Express server and Socket.IO setup
- `server/room.ts` - Room state management and sync logic
- `server/vm/` - Virtual machine providers for shared browsers
- `server/utils/` - Database connections, external APIs, utilities

## Development Commands

### Package Management
```bash
bun install       # Install dependencies
bun add <package> # Add new dependency
bun add -d <package> # Add dev dependency
```

### Start Development
```bash
bun run dev       # Start backend server with hot reload (port 3000)
bun run ui        # Start frontend dev server (Vite)
```

### Build & Type Checking
```bash
bun run build    # Build React app and run typecheck
bun run typecheck # Type check frontend only
bun run typecheckServer # Type check backend only
```

### Code Quality
```bash
bun run prettier # Format all files
```

### Testing/Docker
```bash
bun run testvBrowser # Test virtual browser with Docker
bun run testvlc      # Test VLC virtual browser
```

## Configuration

- Copy `.env.example` to `.env` for configuration
- **Required for basic functionality**: None (works without external services)
- **Optional services** (see server/config.ts for full list):
  - `YOUTUBE_API_KEY` - Enable YouTube video search
  - `VITE_FIREBASE_CONFIG` + `FIREBASE_ADMIN_SDK_CONFIG` - User authentication
  - `DATABASE_URL` - Room persistence (PostgreSQL)
  - `REDIS_URL` - Metrics and caching
  - VM provider tokens for virtual browsers

## Media Support

The app handles various media types through detection utilities:
- YouTube videos (`isYouTube()`)
- HLS streams (`isHls()`)
- DASH streams (`isDash()`)
- Magnet links (`isMagnet()`)
- File shares (`isFileShare()`)
- Screen shares (`isScreenShare()`)
- Virtual browsers (`isVBrowser()`)

## Development Notes

- **Uses Bun** as package manager and runtime (faster than npm/node)
- Backend runs with `bun --watch` for hot reload (replaces ts-node-dev)
- Backend uses **ES modules** with `.ts` extensions in imports
- Frontend uses **Vite** with hot reload on port 3000 (configurable)
- WebRTC requires **HTTPS** for camera/microphone features
- Room synchronization handled via Socket.IO events in room.ts
- Virtual browsers run in Docker containers or cloud VMs