# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WatchParty is a **self-hosted** web application for synchronized video watching with features like screen sharing, virtual browsers, chat, and video calls. This version has been modified to remove SaaS limitations and authentication requirements for private deployment. It's built with React + TypeScript frontend and Node.js + TypeScript backend using Socket.IO for real-time communication.

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
- **Room-based architecture** - each room manages synchronized playbook state (max 5 users per room)
- **VM management** for virtual browsers (Docker/DigitalOcean/Hetzner/Scaleway providers)
- **Access control** - Simple token-based pre-authentication for private deployments
- **Optional services**: Redis (metrics), PostgreSQL (persistence) - **Auth removed** (Firebase/Stripe disabled)

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

### Self-Hosted Access Control
- Copy `.env.example` to `.env` for configuration
- **Access Control** (optional but recommended):
  ```bash
  WATCHPARTY_ACCESS_TOKEN=your_secret_password_here
  WATCHPARTY_ACCESS_EXPIRY=24  # Hours until token expires
  ```

### Optional Services
- **Required for basic functionality**: None (works without external services)
- **Optional services** (see server/config.ts for full list):
  - `YOUTUBE_API_KEY` - Enable YouTube video search
  - `DATABASE_URL` - Room persistence (PostgreSQL)
  - `REDIS_URL` - Metrics and caching
  - VM provider tokens for virtual browsers
  - ~~`VITE_FIREBASE_CONFIG`~~ - **Removed** (authentication disabled)
  - ~~`FIREBASE_ADMIN_SDK_CONFIG`~~ - **Removed** (authentication disabled)
  - ~~`STRIPE_SECRET_KEY`~~ - **Removed** (subscriptions disabled)
  - ~~`RECAPTCHA_SECRET_KEY`~~ - **Removed** (VBrowser protection disabled)

## Media Support

The app handles various media types through detection utilities:
- YouTube videos (`isYouTube()`)
- HLS streams (`isHls()`)
- DASH streams (`isDash()`)
- Magnet links (`isMagnet()`)
- File shares (`isFileShare()`)
- Screen shares (`isScreenShare()`)
- Virtual browsers (`isVBrowser()`)

## Self-Hosted Version Changes

### Removed SaaS Limitations
- ✅ **No user authentication required** - Firebase/auth completely removed
- ✅ **No subscription limits** - All users treated as "subscribers" 
- ✅ **No reCAPTCHA for VBrowsers** - Spam protection disabled
- ✅ **Room capacity**: Limited to 5 users per room (configurable)
- ✅ **VBrowser sessions**: Extended to 5 hours (was 3 hours)
- ✅ **Access control**: Optional token-based pre-auth for private deployment

### Access Control System
- Simple password/token system protects the entire application
- Login form appears before main WatchParty interface
- Configurable token expiry (default: 24 hours)
- Remember login option (localStorage vs sessionStorage)
- If `WATCHPARTY_ACCESS_TOKEN` is not set, no auth required

## Development Notes

- **Uses Bun** as package manager and runtime (faster than npm/node)
- Backend runs with `bun --watch` for hot reload (replaces ts-node-dev)
- Backend uses **ES modules** with `.ts` extensions in imports
- Frontend uses **Vite** with hot reload on port 3000 (configurable)
- WebRTC requires **HTTPS** for camera/microphone features
- Room synchronization handled via Socket.IO events in room.ts
- Virtual browsers run in Docker containers or cloud VMs