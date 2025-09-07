# WatchParty (Self-Hosted)

![screenshot](https://github.com/howardchung/watchparty/raw/main/public/screenshot_full.png)

A **self-hosted** web application for watching videos together - **no authentication required**.

## Features

- **No signup required** - Just create a room and share the link
- **Room capacity**: Max 5 users per room (configurable)
- **Synchronized playback** - Plays, pauses, and seeks are synced to all watchers
- **Media support**:
  - Screen sharing (full screen, browser tab or application)
  - Shared virtual browsers (5-hour sessions)
  - Stream-your-own-file
  - Video files on the Internet (anything accessible via HTTP)
  - YouTube videos
  - Magnet links (via WebTorrent)
  - .m3u8 streams (HLS)
- **Communication**:
  - Text chat
  - Video chat
- **Access control**: Optional password protection for private deployment

## Quick Start (Self-Hosted)

1. **Clone and Install**
   ```bash
   git clone git@github.com:fabiogaliano/watchparty.git
   cd watchparty
   bun install  # or npm install
   ```

2. **Configure Access Control** (Recommended)
   ```bash
   cp .env.example .env
   # Edit .env and set:
   WATCHPARTY_ACCESS_TOKEN=your_secret_password_here
   ```

3. **Start the Application**
   ```bash
   bun run dev      # Backend server (port 3000)
   bun run ui       # Frontend dev server (separate terminal)
   ```

4. **Access Your Instance**
   - Open http://localhost:3000
   - Enter your access token when prompted
   - Create rooms and share links with friends!

**For HTTPS** (required for camera/microphone):
- Set `SSL_KEY_FILE` and `SSL_CRT_FILE` environment variables

## Self-Hosted Modifications

This version has been modified to remove SaaS limitations:

### ✅ Changes Made
- **Authentication removed** - No Firebase, no user accounts required
- **Subscription limits removed** - All users treated as "premium subscribers"
- **reCAPTCHA disabled** - No spam protection needed for private deployment  
- **Room capacity**: Set to 5 users per room (configurable in `server/config.ts`)
- **VBrowser sessions**: Extended to 5 hours (was 3 hours)
- **Access control**: Simple token-based protection added

### Optional Enhancements

#### YouTube API (video search)
```bash
YOUTUBE_API_KEY=your_youtube_api_key_here
```
Get an API key from [Google Cloud Console](https://console.developers.google.com) → YouTube Data API V3

#### Database Persistence
```bash  
DATABASE_URL=postgresql://postgres@localhost:5432/postgres?sslmode=disable
```
For persistent rooms that survive server restarts

#### ~~Firebase Config~~ **REMOVED**
Authentication has been completely removed. No setup required.

#### Virtual Browser Setup (Advanced)
For shared browser instances, install Docker:
```bash
curl -fsSL https://get.docker.com | sh
ssh-keygen  # Generate SSH keys if needed
```

## VPS Deployment

For production deployment on your VPS:

1. **Clone and setup on your server**
2. **Configure environment** - Set `WATCHPARTY_ACCESS_TOKEN` for security
3. **Use process manager** like PM2:
   ```bash
   bun run pm2  # Uses ecosystem.config.js
   ```
4. **Reverse proxy** with nginx/caddy for HTTPS
5. **Share your instance** - Give trusted users the access token

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Semantic UI
- **Backend**: Bun + Express + Socket.IO + TypeScript
- **Optional**: Redis (metrics), PostgreSQL (persistence), Docker (VBrowsers)
- **Removed**: Firebase (auth), Stripe (payments), reCAPTCHA (spam protection)
